import React, { Component } from "react";
import { PDFDownloadLink, PDFRenderer } from "@react-pdf/renderer";

import PdfDocument from "./document";

const LinkComponent = ({ blob, url, loading, error }) => {
  if (error) {
    console.log("Error is defined.");
    return;
  }

  return (
    <React.Fragment>
      {loading && "Generating.."}
      {error && "Some Error"}

      {!loading && !error && (
        <span>
          <i className="fa fa-file" /> Download PDF
        </span>
      )}
    </React.Fragment>
  );
};

class GeneratePdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generated: false
    };
  }

  renderGeneratePDF() {
    return (
      <React.Fragment>
        <PDFDownloadLink
          document={<PdfDocument />}
          className="float-right px-2 ms-cursor"
          fileName="filmwith-location.pdf"
        >
          {LinkComponent}
        </PDFDownloadLink>
      </React.Fragment>
    );
  }

  handleClick = () => {
    console.log("Handle click is called");
    this.setState({ generated: true });
  };

  render() {
    const { generated } = this.state;

    return (
      <React.Fragment>
        {!generated && (
          <a
            onClick={e => this.handleClick()}
            className="float-right px-2 ms-cursor"
          >
            <i className="fa fa-file" /> Genereate Pdf
          </a>
        )}

        {generated && this.renderGeneratePDF()}
      </React.Fragment>
    );
  }
}

export default GeneratePdf;
