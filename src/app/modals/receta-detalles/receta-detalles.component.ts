import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receta-detalles',
  templateUrl: './receta-detalles.component.html',
  styleUrls: ['./receta-detalles.component.scss'],
})
export class RecetaDetallesComponent implements OnInit {
  @Input() receta: any;

  constructor(private modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if (this.receta) {
      this.receta.nutrientes_totales = this.receta.nutrientes_totales || {};
      this.receta.nutrientes_totales.monoacidos_totales = this.receta.nutrientes_totales.monoacidos_totales || {};
      this.receta.vitaminas = this.receta.vitaminas || [];
      this.receta.forma_cocinar = this.receta.forma_cocinar || '';
      this.receta.ingredientes = this.receta.ingredientes || [];
    }
  }
}
