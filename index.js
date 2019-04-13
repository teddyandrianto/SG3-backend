let express = require('express');
let app = express();
let con = require('./koneksi');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("halaman utama")
});
app.get('/mahasiswa',(req,res)=>{
    con.query("SELECT * FROM mahasiswa JOIN fakultas ON fakultas.id_fakultas=mahasiswa.fakultas  ", 
        function(err,rows,fields){
           try{
               res.send({
                   'data' : rows
               });
           }catch(e){
               res.send({'data' : false})
           };
    });
});
app.get('/mahasiswa/:nim',(req,res)=>{
    con.query("SELECT nama, nama_fakultas,id_fakultas FROM mahasiswa JOIN fakultas ON fakultas.id_fakultas=mahasiswa.fakultas WHERE nim=? ",[req.params.nim], 
        function(err,rows,fields){
           try{
               res.send({
                   'data' : rows
               });
           }catch(e){
               res.send({'data' : false})
           };
    });
});
app.post('/mahasiswa',(req,res)=>{
    let data_insert = [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan
    ];

    con.query('INSERT INTO mahasiswa (nim,nama,fakultas,angkatan) VALUES(?,?,?,?)',data_insert,(err,rows,fields)=>{
        if(err){
            res.send({data: false})
        }else{
            res.send({data: true})
        }
    })

})

app.put('/mahasiswa/:nim',(req,res)=>{
    let data_update = [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan,
        req.params.nim
    ];
    con.query("UPDATE mahasiswa SET nim=?,nama=?,fakultas=?,angkatan=? WHERE nim=?",data_update,(err,rows,fields)=>{
        if(err){
            res.send({data: false})
        }else{
            res.send({data: true})
        }
    })
})

app.delete('/mahasiswa/:nim',(req,res)=>{
    con.query("DELETE FROM mahasiswa WHERE nim=?",[req.params.nim],(err,rows,fields)=>{
        if(err){
            res.send({data: false})
        }else{
            res.send({data: true})
        }
    })
})

app.listen(3000);