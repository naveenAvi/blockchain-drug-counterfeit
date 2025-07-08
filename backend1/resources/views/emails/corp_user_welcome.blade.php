<h2>Welcome, {{ $user->firstname }}!</h2>

<p>You’ve been registered on the Drug Supply Chain portal.</p>

<p><strong>Login Credentials:</strong></p>
<ul>
    <li>Email: {{ $user->email }}</li>
    <li>Password: <strong>{{ $password }}</strong></li>
</ul>

<p>Please log in and change your password after your first login.</p>

<p>Thanks,<br>Drug Supply Chain Team</p>
