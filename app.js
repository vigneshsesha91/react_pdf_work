import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './pdf.css';
import samplePDF from '../Amazon_2018_FY_10-K.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const highlightPattern = (text, pattern) => {
 const splitText = text.split(pattern);

 if (splitText.length <= 1) {
   return text;
 }

 const matches = text.match(pattern);

 return splitText.reduce((arr, element, index) => (matches[index] ? [
   ...arr,
   element,
   <mark>
     {matches[index]}
   </mark>,
 ] : [...arr, element]), []);
};

export default class App extends Component {
 state = {
   searchText: '',
 }

 makeTextRenderer = searchText => textItem => highlightPattern(textItem.str, searchText);

 onChange = event => this.setState({ searchText: event.target.value });

 render() {
   const { searchText } = this.state;

   return (
     <React.Fragment>
       <Document
         file={samplePDF}
         onLoadSuccess={this.onDocumentLoadSuccess}
       >
         <Page
           pageNumber={1}
           customTextRenderer={this.makeTextRenderer(searchText)}
         />
       </Document>
       <div>
         <label htmlFor="search">Search:</label>
         <input type="search" id="search" value={searchText} onChange={this.onChange} />
       </div>
     </React.Fragment>
   );
 }
}
