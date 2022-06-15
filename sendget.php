<?php

$json = file_get_contents('php://input');

var_dump($json);
// if (empty($_POST) ===  false) {
//     $request = json_decode(file_get_contents('php://input'));

//     if (isset($request->formName)) {
//         $name = $request->formName;
//         $email = $request->formEmail;
//         $message = $request->formMessage;
//         $honeypot = $request->formHoneypot;
//         $subject = '[[ mail du site distant shores ]]';
//         $recipient = "jbadiorama@gmail.com"; // PLEASE SET YOUR EMAIL ADDRESS

//         if (empty($honeypot)) {
//             $name = filter_var($name, FILTER_SANITIZE_STRING);
//             $email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
//             $message = filter_var($message, FILTER_SANITIZE_STRING);

//             $headers = 'From: ' . $name . ' <' . $email . '>' . "\r\n";
//             $headers .= 'Reply-To: ' . $email . '' . "\r\n";
//             $headers .= 'X-Mailer: PHP/' . phpversion();

//             $email_content = "First Name: $name\n";
//             $email_content .= "Email: $email\n\n";
//             $email_content .= "Message:\n$message\n\n\n";
//             $email_content .= "HOST IP:\n" . $_SERVER['SERVER_ADDR'] . "\n";

//             if (mail($recipient, $subject, $email_content, $headers)) {
//                 echo "Merci, je vous répond vite";
//             } else {
//                 echo "pb de mail";
//             }
//         } else {
//             echo 'robot';
//         }
//     } else {
//         echo '42 page not found';
//     }
// } else echo 'false';