use std::sync::{atomic::AtomicU64, Arc};

use tokio::sync::RwLock;

pub struct Aria2Client {
    http: reqwest::Client,
    port: RwLock<u16>,
    secret: RwLock<String>,
    request_id: AtomicU64,
}

pub struct Aria2State(pub Arc<Aria2Client>);
