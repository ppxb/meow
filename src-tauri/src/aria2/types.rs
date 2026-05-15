use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Aria2FileURI {
    pub uri: String,
    pub status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Aria2File {
    pub index: String,
    pub path: String,
    pub length: String,
    pub completed_length: String,
    pub selected: String,
    #[serde(default)]
    pub uris: Vec<Aria2FileURI>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Aria2TorrentInfo {
    #[serde(default)]
    pub info: Option<Aria2TorrentName>,
    #[serde(default)]
    pub announce_list: Option<Vec<Vec<String>>>,
    #[serde(default)]
    pub creation_date: Option<String>,
    #[serde(default)]
    pub comment: Option<String>,
    #[serde(default)]
    pub mode: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Aria2TorrentName {
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Aria2Task {
    pub gid: String,
    pub status: String,
    pub total_length: String,
    pub completed_length: String,
    pub upload_length: String,
    pub download_speed: String,
    pub upload_speed: String,
    pub connections: String,
    pub dir: String,
    #[serde(default)]
    pub files: Vec<Aria2File>,
    #[serde(default)]
    pub bittorrent: Option<Aria2TorrentInfo>,
    #[serde(default)]
    pub info_hash: Option<String>,
    #[serde(default)]
    pub num_seeders: Option<String>,
    #[serde(default)]
    pub seeder: Option<String>,
    #[serde(default)]
    pub bitfield: Option<String>,
    #[serde(default)]
    pub num_pieces: Option<String>,
    #[serde(default)]
    pub piece_length: Option<String>,
    #[serde(default)]
    pub error_code: Option<String>,
    #[serde(default)]
    pub error_message: Option<String>,
    #[serde(default)]
    pub verified_length: Option<String>,
    #[serde(default)]
    pub verify_integrity_pending: Option<String>,
    #[serde(default)]
    pub followed_by: Option<Vec<String>>,
    #[serde(default)]
    pub following: Option<String>,
    #[serde(default)]
    pub belongs_to: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Aria2GlobalStats {
    pub download_speed: String,
    pub upload_speed: String,
    pub num_active: String,
    pub num_waiting: String,
    pub num_stopped: String,
    pub num_stopped_total: String,
}

#[derive(Debug, Serialize)]
pub(crate) struct JsonRpcRequest {
    pub jsonrpc: &'static str,
    pub id: String,
    pub method: String,
    pub params: Vec<serde_json::Value>,
}

#[derive(Debug, Deserialize)]
pub(crate) struct JsonRpcResponse<T> {
    pub id: Option<String>,
    pub result: Option<T>,
    pub error: Option<JsonRpcError>,
}

#[derive(Debug, Deserialize)]
pub(crate) struct JsonRpcError {
    pub code: i64,
    pub message: String,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn deserialize_minimal_task_from_aria2_json() {
        let json = serde_json::json!({
            "gid": "abc123",
            "status": "active",
            "totalLength": "1024",
            "completedLength": "512",
            "uploadLength": "0",
            "downloadSpeed": "100",
            "uploadSpeed": "0",
            "connections": "5",
            "dir": "/tmp"
        });
        let task: Aria2Task = serde_json::from_value(json).expect("deserialize");
        assert_eq!(task.gid, "abc123");
        assert_eq!(task.status, "active");
        assert_eq!(task.total_length, "1024");
        assert_eq!(task.completed_length, "512");
        assert!(task.files.is_empty());
        assert!(task.bittorrent.is_none());
        assert!(task.error_code.is_none());
    }

    #[test]
    fn deserialize_task_with_bittorrent() {
        let json = serde_json::json!({
            "gid": "bt001",
            "status": "active",
            "totalLength": "0",
            "completedLength": "0",
            "uploadLength": "0",
            "downloadSpeed": "0",
            "uploadSpeed": "0",
            "connections": "0",
            "dir": "/downloads",
            "bittorrent": {
                "info": { "name": "test.torrent" },
                "mode": "multi"
            },
            "infoHash": "abc123def456",
            "seeder": "true",
            "numSeeders": "5"
        });
        let task: Aria2Task = serde_json::from_value(json).expect("deserialize");
        let bittorrent = task.bittorrent.as_ref().unwrap();
        assert_eq!(bittorrent.info.as_ref().unwrap().name, "test.torrent");
        assert_eq!(bittorrent.mode.as_deref(), Some("multi"));
        assert_eq!(task.info_hash.as_deref(), Some("abc123def456"));
        assert_eq!(task.seeder.as_deref(), Some("true"));
        assert_eq!(task.num_seeders.as_deref(), Some("5"));
    }

    #[test]
    fn deserialize_task_with_error_fields() {
        let json = serde_json::json!({
            "gid": "err001",
            "status": "error",
            "totalLength": "0",
            "completedLength": "0",
            "uploadLength": "0",
            "downloadSpeed": "0",
            "uploadSpeed": "0",
            "connections": "0",
            "dir": "/tmp",
            "errorCode": "1",
            "errorMessage": "unknown error"
        });
        let task: Aria2Task = serde_json::from_value(json).expect("deserialize");
        assert_eq!(task.error_code.as_deref(), Some("1"));
        assert_eq!(task.error_message.as_deref(), Some("unknown error"));
    }

    #[test]
    fn deserialize_task_with_followed_by() {
        let json = serde_json::json!({
            "gid": "meta001",
            "status": "complete",
            "totalLength": "100",
            "completedLength": "100",
            "uploadLength": "0",
            "downloadSpeed": "0",
            "uploadSpeed": "0",
            "connections": "0",
            "dir": "/tmp",
            "followedBy": ["child001", "child002"],
            "following": "parent001",
            "belongsTo": "parent001"
        });
        let task: Aria2Task = serde_json::from_value(json).expect("deserialize");
        assert_eq!(
            task.followed_by.as_deref(),
            Some(&["child001".to_string(), "child002".to_string()][..])
        );
        assert_eq!(task.following.as_deref(), Some("parent001"));
        assert_eq!(task.belongs_to.as_deref(), Some("parent001"));
    }
}
