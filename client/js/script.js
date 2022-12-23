// const { default: axios } = require("axios")

// const { config } = require("process");

let formElement = document.createElement("form")
let inputElement = document.createElement("input");
let submitElement = document.createElement('input')
let uploadElement = document.createElement("div")


uploadElement.setAttribute('class', 'upload');
uploadElement.setAttribute('id', 'upload');

inputElement.setAttribute('type', 'file');
inputElement.setAttribute("name", "user-uploader");
inputElement.setAttribute('id', 'uploader');
submitElement.setAttribute('type', 'submit')
submitElement.setAttribute('id', 'submit')

formElement.appendChild(inputElement)
formElement.appendChild(submitElement)
formElement.setAttribute('method', 'post')
formElement.setAttribute('enctype', 'multipart/form-data')
// formElement.setAttribute('action', '/server')


document.body.appendChild(formElement);
document.body.appendChild(uploadElement);


const UploadStatus = document.getElementById("upload")


const former = document.querySelector('form').onsubmit = (e)=>{
    e.preventDefault()
    let  text = document.getElementById("text")
    let file = document.getElementById('uploader').files[0]
    console.log(file);
    const form = new FormData()
    form.append("user-image", file)
    form.append("userEmail", text)
    console.log(form);

    const config = {
        onUploadProgress: (progressEvent) => {
           let loaded = progressEvent.loaded
            let total = progressEvent.total
          
           let loadedKB = Math.floor(loaded/1000);
           let totalKB = Math.floor(total/1000);

           console.log(loadedKB, totalKB)
           let percent = Math.floor(loadedKB/totalKB * 100)

           uploadElement.innerHTML = `
           <div class="content">
                <div style="margin-top: 30px">
                    <span style= "margin-left: 20px;">${file.name}</span>
                    <span style= "margin-left: 20px;">Uploading ${percent}%</span>
                </div>
           </div>
           `

        }
    }

    axios.post("http://localhost:4000/server", form, config).then((feedback)=>{
        console.log(feedback);
    }).catch((err)=>{
        console.log(err)
    })
}
// let uploader = document.getElementById('uploader')
// uploader.addEventListener('input', (event)=>{
//     // let file_upload = uploader.files.item(0);
//     // console.log(file_upload);
//     let value = inputElement.value
//     // const file_reader = new FileReader()
//     // file_reader.readAsDataURL(file_upload)
//     // console.log(file_reader);

//     // file_reader.onload = function (){
//     //     let loaded = this.result
//     //     console.log(loaded);

//         const form = new FormData()
//         form.append('file', value)
//         console.log(form);
//         axios.post("http://localhost:4000/server", form, {
//             headers:{
//                 'Content-Type' : "multipart/form-data"
//             }
//         }).then((feedback)=>{
//             console.log(feedback);
//         }).catch((err)=>{
//             console.log(err)
//         })
//     // }
// })


