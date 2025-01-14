import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ ReactiveFormsModule ],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService) {}

  login() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password).subscribe(user => {
        console.log(user);
      });
    }
  }
}
