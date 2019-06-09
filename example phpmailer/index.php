<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);
header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// CONSTS
$mail->CharSet = 'UTF-8';
$email_biuro = 'biuro@jtlsklima.pl';
$email_serwis =  'serwis@jtlsklima.pl';
// data from post
$topic = $_POST['topic'];
$page = $_POST['page'];
$product = $_POST['product'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$msg = $_POST['msg'];
$politicy = $_POST['politicy'];
$rodo = $_POST['rodo'];
$version = $_POST['version'];

try {
    //Server settings
    $mail->SMTPDebug = 2;                                   // Enable verbose debug output
    // $mail->isSMTP();                                        // Set mailer to use SMTP
    $mail->Host = 'JT home.pl hostname';                        // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                                 // Enable SMTP authentication
    $mail->Username = 'biuro@jtlsklima.pl';                  // SMTP username
    $mail->Password = 'JT mail password';                      // SMTP password
    $mail->SMTPSecure = 'ssl';                              // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                      // TCP port to connect to

    //Recipients
    $mail->setFrom($email_biuro, 'JTLS Technika');

    if($page === 'produkt') {
        $mail->addAddress($email_biuro, $email);
    }

    switch ([$page, $topic]) {
        case ['kontakt', 'product']:
            $mail->addAddress($email_biuro, $email);
            break;
        case ['kontakt', 'awaria']:
            $mail->addAddress($email_serwis, $email);
            $topic = 'Awaria';
            break;
        case ['kontakt', 'przeglad']:
            $topic = 'Przegląd';
            break;
        case ['kontakt', 'inne']:
            $mail->addAddress($email_biuro, $email);
            break;
        case ['serwis', 'awaria']:
            $topic = 'Awaria';
            break;
        case ['serwis', 'przeglad']:
            $topic = 'Przegląd';
            break;
        case ['serwis', 'inne']:
            $mail->addAddress($email_biuro, $email);
            break;
        case ['produkt', 'inne']:
            $mail->addAddress($email_biuro, $email);
            break;
        default:
            $mail->addAddress($email_biuro, $email);
            break;
    }

    // $mail->addAddress($customer_email, $customer_name);               // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // template
    $msgTemplate = "<div style='font-size:12pt; color: #1f497d; font-family: Calibri, Arial, sans-serif'>
    Wiadomość od: ".$email.".<br/>
    Telefon: ".$tel.".<br/>
    Temat: ".$topic.".<br/>
    Treść: <br/>".$msg."</div>";

    $altMsgTemplate = "<div style='font-size:12pt; color: #1f497d; font-family: Calibri, Arial, sans-serif'>
    Wiadomość od ".$email.". \n \n
    Telefon ".$tel.".\n \n
    Temat: ".$topic.". \n \n
    Treść: ".$msg."</div>";

    //Content
    $mail->isHTML(true);

    $mail->Subject = $topic;
    $mail->Body = $msgTemplate;
    $mail->AltBody = $altMsgTemplate;

    $mail->send();
    return json_encode($data);
} catch (Exception $e) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
