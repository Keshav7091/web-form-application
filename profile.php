<?php
    // // Start session (optional, if you want to handle user sessions)
    // session_start();

    include 'db_connect.php';

    $errors = [];

    $sql = "SELECT * FROM users";
    $result = mysqli_query($con, $sql);

    if (!$result) {
        $errors[] = "Error fetching data: " . mysqli_error($con);
    }

    mysqli_close($con);
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Listing</title>
    <link rel="stylesheet" href="assets/css/profile.css">
</head>

<body>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="logo"><a href="signup.php" style="text-decoration: none;"><span class="blue">Profile</span> Hub</a></div>
            <div class="nav-links">
                <a href="profile.php" class="active-link">Profile</a>
                <a href="signup.php">Sign Up</a>
            </div>
        </div>
    </nav>

    <div class="title">List of all Profiles</div>
    <div class="container table-container">
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Password</th>
                        <th>DOB</th>
                        <th>City</th>
                        <th>States</th>
                    </tr>
                </thead>
                <tbody>
                <?php
                    if (empty($errors)) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['first_name'] . "</td>";
                            echo "<td>" . $row['last_name'] . "</td>";
                            echo "<td>" . $row['email'] . "</td>";
                            echo "<td>" . $row['phone'] . "</td>";
                            echo "<td>" . $row['password'] . "</td>";
                            echo "<td>" . $row['dob'] . "</td>";
                            echo "<td>" . $row['city'] . "</td>";
                            echo "<td>" . $row['state'] . "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='9'>Error fetching data: " . implode(", ", $errors) . "</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    
</body>

</html>