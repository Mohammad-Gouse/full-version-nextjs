const navigation = () => {
  return [
      {
      title: 'Home',
      icon: 'mdi:home-outline',
      path: '/home'
    },
    {
      title: 'Reports',
      icon: 'fluent:gift-16-regular',
      children: [
        {
          title: 'Client Ledger',
          path: '/reportledger'
        },
        {
          title: 'Client Brokerage',
          path: '/reportbrokerage'
        },
        {
          title: 'Holding Report',
          path: '/reportholding'
        },
        {
          title: 'Net Position',
          path: '/reportnetposition'
        },
        {
          title: 'Client Wise Financial Statement',
          path: '/reportfinancial'
        },
        {
          title: 'Transaction Statement',
          path: '/reporttransaction'
        },
        {
          title: 'Portfolio',
          path: '/reportportfolio'
        },

      ]
    },
    {
      title: 'Trade Confirmation',
      icon: 'fluent:gift-16-regular',
      children: [
        {
          title: 'Status Report History',
          path: '/tradehistory'
        },
        {
          title: 'Block Data',
          path: '/tradeblockdata'
        },

      ]
    },
    {
      title: 'Client Profile',
      icon: 'fluent:gift-16-regular',
      children: [
        {
          title: 'Client Details',
          path: '/clientdetails'
        },
        {
          title: 'Client Search',
          path: '/clientsearch'
        },
      ]
    },
    {
      title: 'RealTime',
      icon: 'fluent:gift-16-regular',
      children: [
        {
          title: 'TurnOver',
          path: '/realtimeturnover'
        },
        {
          title: 'Transaction Statement',
          path: '/realtimetransaction'
        },
        {
          title: 'Net Position',
          path: '/realtimenetposition'
        },
      ]
    },
    {
      title: 'IPO',
      icon: 'fluent:gift-16-regular',
      children: [
        {
          title: 'Bidding Details',
          path: '/biddingdetails'
        },
        {
          title: 'Allotment Data',
          path: '/allotmentdata'
        },
      ]
    },
    {
      title: 'KYC',
      icon: 'fluent:gift-16-regular',
      children: [
        {
          title: 'Form Tracking',
          path: '/kycformtracking'
        }
      ]
    },
    // {
    //   title: 'menu1',
    //   icon: 'mdi:contact-outline',
    //   path: '/menu1'
    // },
    // {
    //   title: 'menu2',
    //   icon: 'mdi:contact-outline',
    //   path: '/menu2'
    // },
    // {
    //   title: 'menu3',
    //   icon: 'mdi:contact-outline',
    //   path: '/menu3'
    // },
    // {
    //   title: 'create task',
    //   icon: 'mdi:email-outline',
    //   path: '/createtask'
    // },
    // {
    //   title: 'User Info',
    //   icon: 'mdi:email-outline',
    //   path: '/userinfo'
    // },
  
  ]
}

export default navigation
