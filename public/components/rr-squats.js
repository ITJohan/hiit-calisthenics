customElements.define('rr-squats', class RRSquats extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <svg id="result-svg" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle id="result-head" r="16" fill="white" cx="106" cy="74">
          <animate attributeName="cx" dur="3s" repeatCount="indefinite" values="107;106;107"></animate>
          <animate attributeName="cy" dur="3s" repeatCount="indefinite" values="20;74;20"></animate>
        </circle>
        <line id="result-neck" stroke="white" stroke-width="8" stroke-linecap="round" x2="105" y2="47" x1="106" y1="74">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="107;106;107"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="20;74;20"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="105;106;105"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="47;98;47"></animate>
        </line>
        <line id="result-left-upper-arm" stroke="white" stroke-width="8" stroke-linecap="round" x1="105" y1="47" x2="88" y2="112">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="105;106;105"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="47;98;47"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="87;88;87"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="57;112;57"></animate>
        </line>
        <line id="result-body" stroke="white" stroke-width="8" stroke-linecap="round" x1="105" y1="47" x2="108" y2="140">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="105;106;105"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="47;98;47"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="106;108;106"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="99;140;99"></animate>
        </line>
        <line id="result-right-upper-arm" stroke="white" stroke-width="8" stroke-linecap="round" x1="105" y1="47" x2="127" y2="112">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="105;106;105"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="47;98;47"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="127;127;127"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="56;112;56"></animate>
        </line>
        <line id="result-left-lower-arm" stroke="white" stroke-width="8" stroke-linecap="round" x1="88" y1="112" x2="128" y2="100">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="87;88;87"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="57;112;57"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="126;128;126"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="49;100;49"></animate>
        </line>
        <line id="result-right-lower-arm" stroke="white" stroke-width="8" stroke-linecap="round" x1="127" y1="112" x2="89" y2="100">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="127;127;127"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="56;112;56"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="89;89;89"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="50;100;50"></animate>
        </line>
        <line id="result-left-upper-leg" stroke="white" stroke-width="8" stroke-linecap="round" x2="96" y2="137" x1="108" y1="140">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="106;108;106"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="99;140;99"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="96;92;96"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="137;137;137"></animate>
        </line>
        <line id="result-right-upper-leg" stroke="white" stroke-width="8" stroke-linecap="round" x2="120" y2="137" x1="108" y1="140">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="106;108;106"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="99;140;99"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="120;123;120"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="137;138;137"></animate>
        </line>
        <line id="result-left-lower-leg" stroke="white" stroke-width="8" stroke-linecap="round" x1="96" y1="137" x2="91" y2="171">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="96;92;96"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="137;137;137"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="93;91;93"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="166;171;166"></animate>
        </line>
        <line id="result-right-lower-leg" stroke="white" stroke-width="8" stroke-linecap="round" x2="122" y2="166" x1="120" y1="137">
          <animate attributeName="x1" dur="3s" repeatCount="indefinite" values="120;123;120"></animate>
          <animate attributeName="y1" dur="3s" repeatCount="indefinite" values="137;138;137"></animate>
          <animate attributeName="x2" dur="3s" repeatCount="indefinite" values="122;124;122"></animate>
          <animate attributeName="y2" dur="3s" repeatCount="indefinite" values="166;173;166"></animate>
        </line>
      </svg>
    `
  }
})