<?php
// hanlde the email function on server side
$myemail = 'shaun.disal@gmail.com';

if (isset($_POST['name'])) {
    
    $error = false;
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $message = strip_tags($_POST['message']);

    $to = $myemail;
    $email_subject = "Contact form submission: $name";
    $email_body = "You have received a new message. ".
                  "\n Name: $name \n ".
                  "Email: $email\n ".
                  "Message : $message";
    
   if(!$_POST['name'] || !$_POST['email'] || !$_POST['message']) {
       $error = true;
   }
   
    if(!$error) {
        
        if(mail($to,$email_subject,$email_body)) {
            $msg = "Yeah! You're message has been submitted";
            $error = false;
        } else {
            $msg ="Oops! Something went wrong on our server. Please retry later";
            $error = true;
        }
    }
   
    //will make $results available throught ajax in the success callback 
    echo json_encode(array("msg"=>$msg, "error"=>$error));

}
?>