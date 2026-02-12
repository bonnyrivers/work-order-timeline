import { Injectable } from '@angular/core';

export type MenuType = 'edit' | 'create';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public menuIsOpen = false;
  public currentMenuType?: MenuType;

  public openMenu(params?: { menuType: MenuType }) {
    if (this.menuIsOpen) {
      return;
    }

    if (params?.menuType) {
      this.currentMenuType = params.menuType;
    }

    this.menuIsOpen = true;
    return;
  }

  public closeMenu() {
    this.menuIsOpen = false;
  }
}
