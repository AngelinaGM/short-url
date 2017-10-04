import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css']
})
export class UrlFormComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const value = form.value;
    // this.form.form.controls.shortUrl.setValue(value.name);
    this.http.post('http://localhost:3000/api/shorten', {'url': value.name}, {headers: headers})
    .subscribe(
      (response) => this.form.form.controls.shortUrl.setValue(response.json().shortUrl),
      (error) => console.log(error)
    );

  }

}
