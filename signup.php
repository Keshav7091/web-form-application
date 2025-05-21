<?php
$insert = false;
$errors = [];

if (isset($_POST['first_name'])) {
    include 'db_connect.php';

    function clean($data) {
        return htmlspecialchars(trim($data));
    }

    $first_name = clean($_POST['first_name']);
    $last_name = clean($_POST['last_name']);
    $email = clean($_POST['email']);
    $phone = clean($_POST['phone']);
    $password = clean($_POST['password']);
    $repassword = clean($_POST['repassword']);
    $dob = $_POST['dob'];
    $city = clean($_POST['city']);
    $state = clean($_POST['state']);

    if (strlen($first_name) === 0) {
      $errors[] = "First name is required.";
    } elseif (!preg_match("/^[a-zA-Z]+$/", $first_name)) {
        $errors[] = "First name must contain only letters.";
    }
  

    if (!empty($last_name) && !preg_match("/^[a-zA-Z]+$/", $last_name)) {
      $errors[] = "Last name must contain only letters.";
    }

    if (strlen($email) === 0) {
      $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }else{
       $checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        $stmt = $con->prepare($checkEmailQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $errors[] = "Email already exists. Please use a different one.";
        }
    }

    if (!empty($phone) && !preg_match("/^[0-9]{10}$/", $phone)) {
      $errors[] = "Phone number must be exactly 10 digits.";
    }

    if (strlen($password) === 0) {
      $errors[] = "Password is required.";
    } elseif (strlen($password) < 6 || 
            !preg_match("/[A-Z]/", $password) || 
            !preg_match("/[a-z]/", $password) || 
            !preg_match("/[0-9]/", $password) || 
            !preg_match("/[!@#$%^&*]/", $password)) {
        $errors[] = "Password must be strong (A-Z, a-z, 0-9, !@#$%^&*), min 6 chars.";
    } elseif ($password !== $repassword) {
        $errors[] = "Passwords do not match.";
    }

    if (!empty($dob) && !strtotime($dob)) {
      $errors[] = "Invalid date of birth.";
    }

    if (!empty($city) && !preg_match("/^[a-zA-Z\s]+$/", $city)) {
      $errors[] = "City must contain only letters.";
    }

    if (!empty($state) && !preg_match("/^[a-zA-Z\s]+$/", $state)) {
      $errors[] = "State must contain only letters.";
    }

    if (empty($errors)) {
      // $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

      $sql = "INSERT INTO users (`first_name`, `last_name`, `email`, `phone`, `password`, `dob`, `city`, `state`, `created_at`) 
              VALUES ('$first_name', '$last_name', '$email', '$phone', '$password', '$dob', '$city', '$state', current_timestamp())";
      
        if (mysqli_query($con, $sql)) {
            $insert = true;
        } else {
            $errors[] = "Error inserting data: " . mysqli_error($con);
        }
    }

    mysqli_close($con);
}
?>


<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Responsive Registration Form | CodingLab </title>
  <link rel="stylesheet" href="assets/css/signup.css">
</head>

<body>


  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo"><a href="signup.php" style="text-decoration: none;"><span class="blue">Profile</span> Hub</a></div>
      <div class="nav-links">
        <a href="profile.php">Profile</a>
        <a href="signup.php" class="active-link">Sign Up</a>
      </div>
    </div>
  </nav>

  <div class="container">

    <div class="content">
      <h2 class="title">Sign Up for Profile</h2>

      <?php
            if($insert == true){
                echo "<p class='submitMsg'>Thanks for submitting your form.</p>";
            }
      ?>
      <?php
        if (!empty($errors)) {
            echo "<div id='serverErrors' style='color:red; margin-bottom: 15px;'>";
            foreach ($errors as $err) {
                echo "• $err<br>";
            }
            echo "</div>";
        }
      ?>

      <form action="signup.php" method="post" id="signupForm">
        <div class="user-details">

          <div class="input-box">
            <span class="details">First Name*</span>
            <input type="text" name="first_name" id="first_name" placeholder="Enter your first name" required>
          </div>

          <div class="input-box">
            <span class="details">Last Name</span>
            <input type="text" name="last_name" id="last_name" placeholder="Enter your last name">
          </div>

          <div class="input-box">
            <span class="details">Email Address*</span>
            <input type="text" name="email" id="email" placeholder="Enter your email" required>
          </div>

          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="text" name="phone" id="phone" placeholder="Enter your phone number">
          </div>

          <div class="input-box">
            <span class="details">Password</span>
            <div class="password-container">
              <input type="password" id="password" name="password" placeholder="Enter your password" required>
              <span id="togglePassword" class="eye-icon">&#128065;</span>
            </div>
          </div>

          <div class="input-box">
            <span class="details">Re-Password</span>
            <div class="password-container">
              <input type="password" id="repassword" name="repassword" placeholder="Confirm your password" required>
              <span id="toggleRepassword" class="eye-icon">&#128065;</span>
            </div>
          </div>

          <div class="input-box full-width">
            <span class="details">Date of Birth</span>
            <input type="date" name="dob" id="dob" placeholder="dd/mm/yyyy">
          </div>

          <div class="input-box">
            <span class="details">City</span>
            <input type="text" name="city" id="city" placeholder="City">
          </div>

          <div class="input-box">
            <span class="details">State</span>
            <input type="text" name="state" id="state" placeholder="State">
          </div>
          <button class="btn" type="submit">Sign Up</button>
        </div>

      </form>

      <div id="errorMessages"></div>
    </div>
  </div>



  <script src="assets/js/index.js"></script>
  <script src="assets/js/form_validation.js"></script>
</body>

</html>