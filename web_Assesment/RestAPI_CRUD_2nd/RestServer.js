const app = require('express')();
const parser = require("body-parser");
const cors = require('cors');
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());


let student = [];

function readData(){
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    employees = JSON.parse(jsonContent);
}

function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(student);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/student", (req, res)=>{
    readData();
    res.send(JSON.stringify(student));    
})

app.get("/student/:id", (req, res)=>{
    const stdid = req.params.id;
    if(student.length == 0){
        readData();
    }
    let foundRec = student.find((e) => e.stdId == stdid);
    if(foundRec == null)
        throw "Student not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/student", (req, res)=>{
    if(student.length == 0)
        readData();
    let body = req.body;
    
    for (let index = 0; index < student.length; index++) {
        let element = student[index];
        if (element.stdId == body.stdId) {
            element.stdName = body.stdName;
            element.stdAddress = body.stdAddress;
            element.stdSalary = body.stdSalary;
            saveData();
            res.send("Student updated successfully");
        }
    }
    
})

app.post('/student', (req, res)=>{
    if (student.length == 0)
        readData();
    let body = req.body;
    student.push(body);  
    saveData();
    res.send("student added successfully");
})
app.delete("/student/:id", (req, res)=>{
     
    const stdid=req.params.id;
    if(student.length==0)
    {
    readData()
    }
    let foundRec=student.find((e)=>e.stdId==stdid);
    if(foundRec==null)
     throw "Student not found";
    for(let index=0;index<student.length;index++)
    {
        let element=student[index];
        if(element.stdId==stdid)
        {
            student.splice(index,1);
            saveData();
            res.send("student deleted sucessfully");
        }
    }
   
  })

app.listen(1234, ()=>{
    console.log("Server available at 1234");
})
