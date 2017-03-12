## As a prerequisite for prepare

#### 1.json-server setup

#### install

    npm install -g json-server
    
#### create json_server/db.json

    fill data what you need
    
#### start

    json-server --watch --port 5555 json_server_db/db.json
    
#### check as if json-server exists

    http://localhost:5555/items
    
### 2.project setup

    (1) npm install
    
    (2) run as json-server (db start)
    
        json-server --watch --port *5555 **db.json
         
        *5555 -> (selected as you set)
        **db.json -> (located at your project path)
        
    (3) run project 
    
        npm start
        
### 3. project introduce

    (1) flow types defined for react
    
    (2) interacting with json-server
    
    (3) restful-api CRUD with 'GET' || 'POST' || 'PUT' || 'DELETE'
    
    (4) css animation used
    
    (5) ES6 programming writes
    
### 4. references

    (1) http://ithelp.ithome.com.tw/articles/10187243
    
    (2) http://www.runoob.com/jsref/event-ondragstart.html
            
    
    