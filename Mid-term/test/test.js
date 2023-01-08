import { DB } from "https://deno.land/x/sqlite/mod.ts";

/*const db = new DB("test.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");
let a="aaa";
let aa = "aaaaaa";
let b="bbb";
let bb = "bbbbbb";
db.query(`INSERT INTO posts (title,body) VALUES (?,?)`,[a,aa]);
let t1 = db.query("SELECT * FROM posts");
console.log('first',t1);
let pid=2;
db.query(`UPDATE posts SET title= ?, body=? WHERE id=?`,[b,bb,pid]);

let t2 = db.query("SELECT * FROM posts");
console.log('second',t2);
*/

const AllUser = {
    Charles: { username:'Charles', password: 'Charles' }
}
console.log(AllUser['Charles']);
for( const[name,password] of AllUser){
    console.log(name);
    console.log(password);
}


var logout_ = document.getElementById('logout');

logout_.style.display=='none';
/*
UPDATE Students
SET DepartmentId = 3 
WHERE StudentId = 6;*/