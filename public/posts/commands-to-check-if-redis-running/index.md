---
title: Some ways to check if redis is running
date: "2024-09-03"
---

```shell
❯ redis-cli ping
(error) MISCONF Redis is configured to save RDB snapshots, but it's currently unable to persist to disk. Commands that may modify the data set are disabled, because this instance is configured to report errors during writes if RDB snapshotting fails (stop-writes-on-bgsave-error option). Please check the Redis logs for details about the RDB error.
```

```shell
❯ redis-cli config set stop-writes-on-bgsave-error no
OK
```

```shell
❯ redis-cli ping
PONG
```

```shell
❯ redis-cli monitor
OK
^C
```

```shell
❯ launchctl list | grep redis

- 1 homebrew.mxcl.redis
```

```shell
❯ netstat -an | grep 6379
tcp6 0 0 _.6379 _._ LISTEN
tcp4 0 0 _.6379 _._ LISTEN
```

```shell
❯ sudo lsof -i :6379
Password:
COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
redis-ser 552 root 6u IPv4 0x8247ca7fe664ff3d 0t0 TCP _:6379 (LISTEN)
redis-ser 552 root 7u IPv6 0x5d494008870a7357 0t0 TCP _:6379 (LISTEN)
```

```shell
❯ nc -vz localhost 6379
Connection to localhost port 6379 [tcp/*] succeeded!
```

```shell
❯ ps aux | grep redis
minho 33709 0.9 0.0 410724048 1376 s094 S+ 8:34am 0:00.00 grep redis
root 552 0.0 0.0 411313488 2608 ?? Ss 25Aug24 2:43.87 /opt/homebrew/bin/redis-server \*:6379
```

```shell
❯ brew services list | grep redis
redis error 256 minho ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

```shell
❯ redis-cli info server

# Server

redis*version:7.2.5
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:bd81cd1340e80580
redis_mode:standalone
os:Darwin 23.6.0 arm64
arch_bits:64
monotonic_clock:POSIX clock_gettime
multiplexing_api:kqueue
atomicvar_api:c11-builtin
gcc_version:4.2.1
process_id:552
process_supervised:no
run_id:bce63cfeb8422f981961e352703b4f042a9fcb75
tcp_port:6379
server_time_usec:1725173002139099
uptime_in_seconds:635273
uptime_in_days:7
hz:10
configured_hz:10
lru_clock:13896970
executable:/opt/homebrew/bin/redis-server
config_file:
io_threads_active:0
listener0:name=tcp,bind=*,bind=-::\_,port=6379
```
