document.getElementById("displaytext").style.display = "none";

function searchPhoto()
{

  var apigClient = apigClientFactory.newClient({
                     apiKey: "QZyNutjpMiaCkLerrJ0Uj9ulUJ1siigx4zoRoL3x"
        });

    var user_message = document.getElementById('note-textarea').value;

    var body = { };
    var params = {q : user_message};
    var additionalParams = {headers: {
    'Content-Type':"application/json"
  }};

    apigClient.searchGet(params, body , additionalParams).then(function(res){
      var data = {}
      var data_array = []
      resp_data  = res.data
      console.log("response data is",resp_data);
      length_of_response = resp_data.length;
      if(length_of_response == 0)
      {
        document.getElementById("displaytext").innerHTML = "No Images Found !!!"
        document.getElementById("displaytext").style.display = "block";

      }
      for(let i of resp_data['body']) {
          console.log("reaching");
      }
      resp_data['body'].forEach( function(obj) {
        console.log("response data is",resp_data);
          var img = new Image();
          img.src = "https://s3.us-west-2.amazonaws.com/assignment2api2062ak8853/"+obj;
          console.log(obj);
          img.setAttribute("class", "banner-img");
          img.setAttribute("alt", "effy");
          console.log("Reaching");
          console.log(img);
          document.getElementById("displaytext").innerHTML = "Images returned are : "
          document.getElementById("img-container").appendChild(img);
          document.getElementById("displaytext").style.display = "block";

        });
      }).catch( function(result){

      });



}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => resolve(reader.result)
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}



function uploadPhoto()
{
   // var file_data = $("#file_path").prop("files")[0];
   var file = document.getElementById('file_path').files[0];
   const reader = new FileReader();

   var file_data;
   // var file = document.querySelector('#file_path > input[type="file"]').files[0];
   var encoded_image = getBase64(file).then(
     data => {
     console.log(data)
     var apigClient = apigClientFactory.newClient({
                       apiKey: "QZyNutjpMiaCkLerrJ0Uj9ulUJ1siigx4zoRoL3x"
          });

     // var data = document.getElementById('file_path').value;
     // var x = data.split("\\")
     // var filename = x[x.length-1]
     var file_type = file.type + ";base64"

     var body = data;
     var params = {"key" : file.name, "bucket" : "assignment2api2062ak8853", "Content-Type" : file.type};
     var additionalParams = {};
     apigClient.uploadBucketKeyPut(params, body , additionalParams).then(function(res){
       if (res.status == 200)
       {
         document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!"
         document.getElementById("uploadText").style.display = "block";
       }
     })
   });

}