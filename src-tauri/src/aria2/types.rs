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
