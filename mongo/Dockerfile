FROM mongo:8.0
#£
COPY 00-create-user.js /docker-entrypoint-initdb.d/

EXPOSE 27017

CMD ["mongod"]