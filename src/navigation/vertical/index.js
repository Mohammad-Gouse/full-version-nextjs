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
          path: '/ledgerreport'
        },
        {
          title: 'Client Brokerage',
          path: '/brokeragereport'
        },
        {
          title: 'Holding Report',
          path: '/holdingreport'
        },
        {
          title: 'Net Position',
          path: '/netpositionreport'
        },
        {
          title: 'Client Wise Financilal Statement',
          path: '/financialreport'
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
