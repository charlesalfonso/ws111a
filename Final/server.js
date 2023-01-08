import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as home from './home.js';

const db = new DB("vlog.db");
db.query("CREATE TABLE IF NOT EXISTS vlogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

const router = new Router();

router.get('/', list)
    .get('/login',loginUi)
    .post('/login', login)
    .get('/vlog/new', add)
    .get('/vlog/:id', show)
    .get('/logout', logout)
    .get('/who',who)
    .post('/vlog', create)
    .post('/edit/:id',edit)
    .get('/delete/:id', ddd);

const app = new Application();
app.use(Session.initMiddleware())
app.use(router.routes());
app.use(router.allowedMethods());


const AllUser = {
    Charles: { username:'Charles', password: 'Charles' }
}

async function ddd(ctx){
    const pid = ctx.params.id;
    db.query(`DELETE FROM vlogs WHERE id=${pid}`)
    list(ctx);
}

async function who(ctx){
    //console.log('I\'m in who' );
    if(await ctx.state.session.get('who')==null)await ctx.state.session.set('who','Guest');
    let who = await ctx.state.session.get('who');
    const GSM={};
    GSM['identity']=who;
    ctx.response.type = 'application/json';
    ctx.response.body = GSM;
}

function query(sql) {
    let list = []
    for (const [id, title, body] of db.query(sql)) {
      list.push({id, title, body})
    }
    return list
}
async function list(ctx) {
    let who = await ctx.state.session.get('who');
    if(who=='Charles'){
        let vlogs = query("SELECT id, title, body FROM vlogs");
        ctx.response.body = await home.list(vlogs);
    }else{
        let vlogs = '';
        ctx.response.body = await home.list(vlogs);
    }
    //console.log('list:vlogs=', vlogs)
}

async function login(ctx) {
    const body = ctx.request.body();
    const value = await body.value;
    const user={};
    for( const[uname,psw] of value){
        user[uname]=psw;
    }
    let who = "Guest";
    console.log('user= ',user);
    if(user.username==AllUser['Charles'].username && user.password==AllUser['Charles'].password){
        who='Charles';
    }
    await ctx.state.session.set('who',who);
    if(who == 'Guest'){
        let fail = `<div style="font-size:50px;"><center>Login Fail!!<br><a href="/">Home</a></center></div>`;
        ctx.response.body = home.layout2('Login Fail',fail);
    }
    else{ 
        ctx.response.redirect('/');
    }
}
  
async function logout(ctx) {
    await ctx.state.session.set('who', 'Guest');
    ctx.response.redirect('/');
}
  
async function loginUi(ctx) {
    ctx.response.body = await home.loginUi();
}
  
  
async function add(ctx) {
ctx.response.body = await home.newPost();
}
  
async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") {
        const pairs = await body.value
        const vlog = {}
        for (const [key, value] of pairs) {
            vlog[key] = value
        }
        console.log('create:vlog=', vlog)
        db.query("INSERT INTO vlogs (title, body) VALUES (?, ?)", [vlog.title, vlog.body]);
        ctx.response.redirect('/');
    }
}


  
async function show(ctx) {
    const pid = ctx.params.id;
    let vlogs = query(`SELECT id, title, body FROM vlogs WHERE id=${pid}`)
    let vlog = vlogs[0]
    console.log('show:vlog=', vlog)
    if (!vlog) ctx.throw(404, 'invalid vlog id');
    ctx.response.body = await home.show(vlog);
}

async function edit(ctx){
    const pid = ctx.params.id;
    const body = ctx.request.body()
    if (body.type === "form") {
        const pairs = await body.value
        const vlog = {}
        for (const [key, value] of pairs) {
            vlog[key] = value
        }
        console.log('edit:vlog=', vlog)
        console.log('vlog.title : ',vlog.title);
        console.log('vlog.body : ',vlog.body);
        db.query(`UPDATE vlogs SET title = ?,body=? WHERE id=?`,[vlog.title,vlog.body,pid]);
        console.log('title updated')
        console.log('body updated')
        ctx.response.redirect('/');
    }
    
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });