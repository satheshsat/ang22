import { inject, Service } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Service()
export class Seo {
    titleService = inject(Title);
    metaService = inject(Meta);

  setSEOData(title: string, description: string) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
  }
}
