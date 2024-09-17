
  import React from 'react';
  
  const Marquee = () => {
    const marqueeStyle = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: 'white',
      height:'1rem',
      position:'fixed',
      width:'100vw',
      background:'#25335C',
      left:0,
      bottom:0,
      zIndex: 1233,
      fontSize: '10px'

    };
  
  
    return (
          <div style={marqueeStyle}>
            <marquee id="maqid" scrolldelay="90" direction="left" loop="repeat" width="100%">
                  <b>Nirmal Bang Securities Private Limited :</b> Member BSE Clearing No.498, SEBI Registration No. BSE Cash Segment  INZ000202536 , BSE Derivative Segment  INZ000202536 , Exchange Registered member in CDS . Member NSE-  ID 09391, SEBI Registration No. NSE Cash  Segment INZ000202536 , NSE FO Segment  INZ000202536 , NSE Currency Segment  INZ000202536 .Member MSEI- ID 1067, SEBI Registration No. MSEI Cash Segment  INZ000202536 , MSEI FO Segment INZ000202536 , MSEI Currency Derivative Segment INZ000202536 , PMS Registration No. INP000002981, Research Analyst Registration No. INH000001766. DP Participants NSDL–CDSL Registration No. IN-DP-CDSL 37-99. Nirmal Bang Equities Private Limited : Member BSE Clearing No. 245  SEBI Registration No. BSE Cash Segment  INZ000186135, Member NSE ID 13437 –SEBIRegistration No. NSE Cash  Segment. INZ000186135, NSE FO Segment INZ000186135, NSE Currency Derivative Segment INZ000186135. Member MSEI ID- 17780,SEBI Registration No. MSEI Cash segment INZ000186135, MSEI FO Segment INZ000186135. Research Analyst Registration No. INH000001436.Nirmal Bang Commodities Private Limited : Member MCX –ID 16590, NCDEX –ID 00362 –NMCE –ID –CL0285 , ICEX - ID 1165 SEBI Registration No. INZ000043630, Member NCDEX Spot Exchange - 10084, Comtrack Participant CPID -5040,  Participant CDSL Commodity Repository Limited - 12013300
              </marquee>
          </div>
    );
  };
  
  export default Marquee;
    