#mongo db path
systemLog:
 destination: file
 path: /usr/local/var/log/mongodb/mongo.log
 logAppend: true
storage:
 dbPath: /usr/local/var/mongodb
net:
 bindIp: 127.0.0.1

#db-commands
 1) db states - db.stats() , [in bytes]
 2) collection states - db.movienameschemas.stats()
 3) collection data size - db.movienameschemas.dataSize()
