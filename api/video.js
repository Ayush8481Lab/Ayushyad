import crypto from "crypto";

export default function handler(req,res){

const ref = req.headers.referer || "";
const origin = req.headers.origin || "";

if(!ref.includes("ayushyad.vercel.app") && !origin.includes("ayushyad.vercel.app")){
return res.status(403).send("Forbidden");
}

const {token,expire}=req.query;

if(!token || !expire){
return res.status(403).send("Invalid");
}

if(expire < Math.floor(Date.now()/1000)){
return res.status(403).send("Expired");
}

const valid = crypto
.createHmac("sha256",process.env.SECRET_KEY)
.update(String(expire))
.digest("hex");

if(token !== valid){
return res.status(403).send("Bad token");
}

const drive = `https://drive.google.com/file/d/${process.env.DRIVE_ID}/preview`;

res.send(`
<!DOCTYPE html>
<html>
<body style="margin:0;background:black">

<iframe
src="${drive}"
style="border:none;width:100%;height:100vh"
allow="autoplay;fullscreen">
</iframe>

</body>
</html>
`);

}
