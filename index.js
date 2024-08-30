import express from "express";
import cluster from "cluster";
import os from "os";




const totalCpu= os.cpus.length;

if(cluster.isPrimary){
    console.log(`Number of CPUs is ${totalCpu}`);
    console.log(`Process no is ${process.pid}`);

    for( let i =0; i<totalCpu ; i++){
        cluster.fork();
    }
cluster.on("exit",(worker,code,signal)=>{
    console.log(worker.process.pid + " Died");
    console.log(`Lets Fork another worker`);
})

}

else{
    const app =express();
app.get("/", (req,res)=>{
    res.send("Please add some data to count")
})

app.get("/sum", (req,res)=>{
    const n= parseInt(req.query.n)
    let sum =0;

    for(let i=0 ; i<=n ; i++) sum += i;

    res.send(`Final count is ${sum} and was running on ${process.pid}`)
 

})
app.listen(3000);
}