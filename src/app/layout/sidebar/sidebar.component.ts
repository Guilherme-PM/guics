import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { Ripple } from 'primeng/ripple';
import { StyleClass } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, ButtonModule, AvatarModule, Ripple, StyleClass, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  openMenus: boolean = true;
  user: any;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit(): void {
    // Recuperando os dados do usuário do localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user) {
      console.log('Usuário logado:', this.user.name); // Acessando o nome do usuário
      console.log('ID do usuário:', this.user.idUser); // Acessando o id do usuário
    }
  }

  menuItems = [
    {
      title: 'Home',
      url: '/home',
      type: 'item',
      icon: 'pi pi-home',
      favorito: true,
      target: false
    },
    {
      title: 'Sobre',
      url: '/about',
      type: 'item',
      icon: 'pi pi-info-circle',
      favorito: false,
      target: false
    },
    {
      title: 'Serviços',
      type: 'collapse',
      icon: 'pi pi-briefcase',
      isCollapsed: false,
      favorito: false,
      children: [
        {
          title: 'Desenvolvimento Web',
          url: '/services/web-development',
          type: 'item',
          icon: 'pi pi-code',
          favorito: true,
          target: false
        },
        {
          title: 'Design Gráfico',
          url: '/services/graphic-design',
          type: 'item',
          icon: 'pi pi-palette',
          favorito: false,
          target: false
        },
        {
          title: 'Marketing Digital',
          type: 'collapse',
          icon: 'pi pi-chart-line',
          isCollapsed: false,
          favorito: false,
          children: [
            {
              title: 'SEO',
              url: '/services/marketing-digital/seo',
              type: 'item',
              icon: 'pi pi-search',
              favorito: true,
              target: false
            },
            {
              title: 'Social Media',
              url: '/services/marketing-digital/social-media',
              type: 'item',
              icon: 'pi pi-facebook',
              favorito: false,
              target: false
            }
          ]
        }
      ]
    },
    {
      title: 'Contato',
      url: '/contact',
      type: 'item',
      icon: 'pi pi-envelope',
      favorito: false,
      target: false
    }
  ];
  
  closeDrawer() {
    this.visible = false;
  }

  visible: boolean = false;
}
