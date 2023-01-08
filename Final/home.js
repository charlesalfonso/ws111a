export function loginUi() {
    return layout2('Login', `
    <center><h1>Login</h1><center>
    <center><form action="/login" method="post">
      <p><input type="text" placeholder="username" name="username"></p>
      <p><input type="password" placeholder="password" name="password"></p>
      <p><input type="submit" value="Login"></p>
    </form><center>
    `)
}
  
export function list(vlogs) {
    let list = []
    for (let vlog of vlogs) {
        list.push(`
        <li>
        <h2>${vlog.title } : <a href="/vlog/${vlog.id}">Edit</a> : <a href="/delete/${vlog.id}">Delete</a></h2>
        <p>${vlog.body}</p>
        </li>
        `)
    }
    let content = `
    <h1>VLog</h1>
    <p>You have <strong>${vlogs.length}</strong> vlogs!</p>
    <ul id="vlogs">
        ${list.join('\n')}
    </ul>
    `
    return layout('Vlogs', content)
}

export function newPost() {
    return layout2('New Vlog', `
    <h1>New Vlog</h1>
    <p>Create a new vlog.</p>
    <form action="/vlog" method="post">
        <p><input type="text" placeholder="Title" name="title"></p>
        <p><textarea placeholder="Contents" name="body"></textarea></p>
        <p><input type="submit" value="Create"></p>
    </form>
    `
    )
}

export function show(vlog) {
    return layout2(vlog.title, `
        <h1>Original vlog</h1>
        <hr>
      <h1>${vlog.title}</h1>
      <p>${vlog.body}</p><br><br>
      <h1>New Vlog</h1><hr>
      <p>Create a new vlog.</p>
      <form action="/edit/${vlog.id}" method="post">
          <p><input type="text" placeholder="Title" name="title"></p>
          <p><textarea placeholder="Contents" name="body"></textarea></p>
          <p><input type="submit" value="Save"></p>
      </form>
    `)
  }

  export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>

          body {
            padding: 80px;
            font: 16px Helvetica, Arial;
          }
      
          h1 {
            font-size: 2em;
          }
      
          h2 {
            font-size: 1.2em;
          }
      
          #vlogs {
            margin: 0;
            padding: 0;
          }
      
          #vlogs li {
            margin: 40px 0;
            padding: 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            list-style: none;
          }
      
          #vlogs li:last-child {
            border-bottom: none;
          }
      
          textarea {
            width: 500px;
            height: 300px;
          }
      
          input[type=text],
          textarea {
            border: 1px solid #eee;
            border-top-color: #ddd;
            border-left-color: #ddd;
            border-radius: 2px;
            padding: 15px;
            font-size: .8em;
          }
      
          input[type=text] {
            width: 500px;
          }
      </style>
    </head>
    <body>
    <div id="login1" ><a href="/login">Login</a></div>
    <div id="logout1" ><a href="/logout">Logout</a></div>
    
      <center><h1 id="whoru">FinalTerm</h1></center>
      <center><h2>目前就讀於國立金門大學 : 資工二年級</h2></center>
      <hr>
      <section id="content">
      ${content}
        </section>
    <center><p><a href="/vlog/new">Create new vlog</a></p></center><br>
    <div id="footer">
      <pre><center><h1>学习</h1></center></pre>
      <hr width="100%">
      <pre><center>2018-2021 : State High School 2 Jakarta</center></pre>
      <pre><center>2021-2025 : National Quemoy University</center></h2></pre>
  </div>
      <div id="footer2">
          <pre><center><h1>Programming</h1></center></pre>
          <hr width="100%">
          <pre><center>C# Language</center></pre>
          <pre><center>C/C++ Language</center></pre>
          </div>
    </body>
    <script>
    var test = document.getElementById('whoru');
    async function WHO(){
        let who = await window.fetch('/who');
        let who2 = await who.json();
        console.log(who2.identity);
        test.innerHTML = who2.identity;
        var login2 = document.getElementById('login1');
        var logout2 = document.getElementById('logout1');
        if(who2.identity == "Guest"){
            login2.style.display =='block';
            logout2.style.display =='none';
        }
        else{
            logout2.style.display =='block';
            login2.style.display =='none';
        }

    }
    window.addEventListener("load", (event) => {
        WHO();
    });
</script>
  </html>
    `
}

export function layout2(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
          #footer{
              position: absolute;
              bottom: 0;
              left: 35%;
          }
          #footer2{
              position: absolute;
              left: 55%;
              bottom: 0;
          }
          body {
            padding: 80px;
            font: 16px Helvetica, Arial;
          }
      
          h1 {
            font-size: 2em;
          }
      
          h2 {
            font-size: 1.2em;
          }
      
          #vlogs {
            margin: 0;
            padding: 0;
          }
      
          #vlogs li {
            margin: 40px 0;
            padding: 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            list-style: none;
          }
      
          #vlogs li:last-child {
            border-bottom: none;
          }
      
          textarea {
            width: 500px;
            height: 300px;
          }
      
          input[type=text],input[type=password],
          textarea {
            border: 1px solid #eee;
            border-top-color: #ddd;
            border-left-color: #ddd;
            border-radius: 2px;
            padding: 15px;
            font-size: .8em;
          }
      
          input[type=text],input[type=password] {
            width: 500px;
          }
      </style>
    </head>
    <body>
      <section id="content">
      ${content}
        </section>
    </body>

  </html>
    `
}

