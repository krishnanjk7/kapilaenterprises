import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { LookupService } from 'src/app/service/lookup.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit, AfterViewChecked {

  invoice;
  invoiceGroup = [];
  showInvoice = false;

  consigneeAdd: any = null;
  consigneeAltAdd: any = null;

  invoiceType = 1;

  @ViewChild('invoiceTable', { static: false }) container: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private lookUpService: LookupService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.invoiceType = this.route.snapshot.params['type'];
    this.invoiceService.getInvoice(id).subscribe(
      (s: any) => {
        this.invoice = s;
        console.log(s);
        
        this.showInvoice = true;
        if(!s.ship_to_same){
          this.lookUpService.getShipToAddress(s.id).subscribe(
            (s) => {
              this.consigneeAltAdd = s;
            },
            (e) => {

            }
          );
        }
        this.clientService.getClient(s.client_id).subscribe(
          (r) => {
            this.consigneeAdd = r;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (e) => {
        console.log(e);
      }
    );


    this.invoiceService.getInvoiceGroup(id).subscribe(
      (s: any) => {
        this.invoiceGroup = s;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  alignInvoice() {
    if (this.showInvoice) {

      const invHeight = this.container.nativeElement.clientHeight;
      const invWidth = this.container.nativeElement.clientWeight;

      const lastProdRow = document.getElementById('last-prod-row') as HTMLTableRowElement;

      const prodRows = document.getElementsByClassName('prod-row') as HTMLCollectionOf<HTMLTableRowElement>;
      let rowH = 0;
      if (prodRows.length > 0) {
        for (let i = 0; i < prodRows.length; i++) {
          if (prodRows.length > i + 1) {
            rowH += prodRows[i].clientHeight;
          }
        }
      }
      // lastProdRow.style.height = (650 - rowH) + 'px'; - added igst
      lastProdRow.style.height = (605 - rowH) + 'px';

      console.log((lastProdRow.clientHeight - rowH) + 'px');
    }
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array: any = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + parseInt(n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      let value: any = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
  }

  printPage() {
    window.print();
  }

  ngAfterViewChecked() {
    this.alignInvoice();
  }

}