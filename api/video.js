export default function handler(req,res){

const ref = req.headers.referer || "";
const origin = req.headers.origin || "";

/* allow only your domain */

if(!ref.includes("ayushyad.vercel.app") && !origin.includes("ayushyad.vercel.app")){
return res.status(403).send("Forbidden");
}

const drive = `https://drive.google.com/file/d/${process.env.DRIVE_ID}/preview`;

res.send(`
<!DOCTYPE html>
<html>
<head>
<style>
body{
margin:0;
background:black;
}
iframe{
border:none;
width:100%;
height:100vh;
}
</style>
</head>

<body>

<iframe src="${drive}" allow="autoplay;fullscreen"></iframe>

</body>
</html>
`);

}
