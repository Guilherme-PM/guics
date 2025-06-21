import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, FormsModule, CheckboxModule, ButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    businessName: ['', Validators.required]
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const { email, password, businessName } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password, businessName).subscribe(user => {
        if (user.token) {
          localStorage.setItem('user', JSON.stringify({
            token: user.token,
            name: user.name,
            idUser: user.idUser,
            idCompany: user.idCompany
          }));

          this.router.navigate(['admin/dashboard']);
        }
        else 
          console.error('Login falhou: Token não encontrado.');
      });
    }
  }
}
