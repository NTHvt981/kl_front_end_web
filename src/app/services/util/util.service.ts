import { Injectable } from '@angular/core';
declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public processFile(imageInput) {
    const fileHinhAnh:File = imageInput.files[0];
    let urlHinhAnh:string | ArrayBuffer;

    const reader = new FileReader();
  
    reader.onload = ((e) => {
      urlHinhAnh = e.target['result'];
    });
  
    reader.readAsDataURL(fileHinhAnh);
    return urlHinhAnh;
  }

  public  static makeRowsSameHeight() {
    setTimeout(() => {
      if ($('.ui-table-scrollable-wrapper').length) {
        let wrapper = $('.ui-table-scrollable-wrapper');
        wrapper.each(function () {
          let w = $(this);
          let frozen_rows: any = w.find('.ui-table-frozen-view tr');
          let unfrozen_rows = w.find('.ui-table-unfrozen-view tr');
          for (let i = 0; i < frozen_rows.length; i++) {
            if (frozen_rows.eq(i).height() > unfrozen_rows.eq(i).height()) {
              unfrozen_rows.eq(i).height(frozen_rows.eq(i).height());
            } else if (frozen_rows.eq(i).height() < unfrozen_rows.eq(i).height()) {
              frozen_rows.eq(i).height(unfrozen_rows.eq(i).height());
            }
          }
        });
      }
    });
  }
}
