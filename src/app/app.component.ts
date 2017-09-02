import { Component } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
  title = 'app';
  results =[];
  URL = 'https://gateway.marvel.com:443/v1/public/characters';
  key = '556eba49bd87adab61a03e494def7afd'; 

  constructor(private http:Http, public sanitizer:DomSanitizer){
  	this.http=http;
  	this.getData();
  }


  getData() {
    let LOCATION = this.URL + '?apikey=' + this.key;
    console.log( LOCATION );
    this.http.get( LOCATION )
    .subscribe(
    	data => {
    		//this.results = data['results'];
    		let res = JSON.parse(data["_body"]);
    		let results = res.data.results;
    		for(let i in results) {
    			let row = {title:null, image:null, description:"No Descriprion"};
    			row.title = results[i].name;
    			if ( results[i].description ) {
    				row.description = results[i].description.substring(0,50) + " ...";
    			}
    			row.image = results[i].thumbnail.path + "." +results[i].thumbnail.extension;
    			this.results.push(row);
    			console.log(results[i]);
    		}
    	}
	);    
  }  
}
