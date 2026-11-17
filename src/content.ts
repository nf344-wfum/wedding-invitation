/**
 * CENTRALIZED INVITATION CONTENT AND CONFIGURATION
 * Single source of truth for all event content, translations, names,
 * dates, addresses, media assets, and feature flags.
 *
 * Wedding Ceremony: Azraf & Huzaifa
 * Date: Friday, 15 January 2027
 * Venue: Xinxian Restaurant & Event Space (Uttara)
 */

export interface ContentConfig {
  config: {
    defaultLanguage: 'en' | 'bn'
    heroImage: string
    heroImageWidth: number
    heroImageHeight: number
    heroAlt: {
      en: string
      bn: string
    }
    showMap: boolean
    showFamilyAddresses: boolean
  }

  event: {
    date: string // YYYY-MM-DD
    time: string // HH:mm
    endTime: string // Configurable end time
    timezone: string
    isoDateTime: string
    isoEndDateTime: string
  }

  contact: {
    whatsappRsvp: {
      number: string
      display: string
      international: string
      url: string
    }
    informationPhone: {
      number: string
      display: string
      displayBn: string
      international: string
      telUrl: string
    }
    whatsappMessage: {
      en: string
      bn: string
    }
  }

  venue: {
    latitude: number
    longitude: number
    googleMapsEmbedUrl: string
    googleMapsDirectionsUrl: string
    name: {
      en: string
      bn: string
    }
    address: {
      en: string
      bn: string
    }
    fullAddress: {
      en: string
      bn: string
    }
  }

  groom: {
    name: {
      en: string
      bn: string
    }
    fullName: {
      en: string
      bn: string
    }
    father: {
      en: string
      bn: string
    }
    mother: {
      en: string
      bn: string
    }
    address: {
      en: string
      bn: string
    }
  }

  bride: {
    name: {
      en: string
      bn: string
    }
    fullName: {
      en: string
      bn: string
    }
    father: {
      en: string
      bn: string
    }
    mother: {
      en: string
      bn: string
    }
    address: {
      en: string
      bn: string
    }
  }

  hosts: {
    title: {
      en: string
      bn: string
    }
    members: Array<{
      en: string
      bn: string
    }>
  }

  welcomingCommittee: {
    title: {
      en: string
      bn: string
    }
    members: Array<{
      en: string
      bn: string
    }>
  }

  translations: {
    en: {
      bismillah: string
      heroTagline: string
      heroTitle: string
      subtitle: string
      dateLine: string
      countdownLabels: {
        days: string
        hours: string
        min: string
        sec: string
      }
      countdownFinished: string
      countdownStates: {
        eventDay: string
        postEvent: string
      }
      envelope: {
        bismillah: string
        tagline: string
        coupleNames: string
        openButton: string
        skipButton: string
        replayButton: string
      }
      invitationHeading: string
      invitationBody: string
      familyBlock: {
        groomParentsTitle: string
        brideParentsTitle: string
        fatherLabel: string
        motherLabel: string
        addressLabel: string
      }
      details: {
        date: string
        time: string
        venue: string
        calendarBtn: string
        directionsBtn: string
      }
      timeline: {
        title: string
        dateStep: string
        timeStep: string
        venueStep: string
        lunchReception: string
      }
      venueHeading: string
      rsvpHeading: string
      rsvpHelper: string
      rsvpContactLabel: string
      buttons: {
        whatsapp: string
        call: string
        calendar: string
        directions: string
        floatingRsvp: string
      }
      accordion: {
        title: string
        withLove: string
        welcoming: string
      }
      footer: {
        presence: string
        duaArabic: string
        duaTranslation: string
        credits: string
      }
      nav: {
        home: string
        invitation: string
        venue: string
        rsvp: string
        languageSwitch: string
      }
    }
    bn: {
      bismillah: string
      heroTagline: string
      heroTitle: string
      subtitle: string
      dateLine: string
      countdownLabels: {
        days: string
        hours: string
        min: string
        sec: string
      }
      countdownFinished: string
      countdownStates: {
        eventDay: string
        postEvent: string
      }
      envelope: {
        bismillah: string
        tagline: string
        coupleNames: string
        openButton: string
        skipButton: string
        replayButton: string
      }
      invitationHeading: string
      invitationBody: string
      familyBlock: {
        groomParentsTitle: string
        brideParentsTitle: string
        fatherLabel: string
        motherLabel: string
        addressLabel: string
      }
      details: {
        date: string
        time: string
        venue: string
        calendarBtn: string
        directionsBtn: string
      }
      timeline: {
        title: string
        dateStep: string
        timeStep: string
        venueStep: string
        lunchReception: string
      }
      venueHeading: string
      rsvpHeading: string
      rsvpHelper: string
      rsvpContactLabel: string
      buttons: {
        whatsapp: string
        call: string
        calendar: string
        directions: string
        floatingRsvp: string
      }
      accordion: {
        title: string
        withLove: string
        welcoming: string
      }
      footer: {
        presence: string
        duaArabic: string
        duaTranslation: string
        credits: string
      }
      nav: {
        home: string
        invitation: string
        venue: string
        rsvp: string
        languageSwitch: string
      }
    }
  }
}

export const CONTENT: ContentConfig = {
  config: {
    defaultLanguage: 'en',
    heroImage: '/images/hero/hero-background.webp',
    heroImageWidth: 900,
    heroImageHeight: 1600,
    heroAlt: {
      en: 'Painted golden wedding arch with a bride in red and a groom in ivory walking beneath a chandelier',
      bn: 'একটি সোনালী খিলান ও ঝাড়বাতির নিচে লাল শাড়িতে কনে ও আইভরি পোশাকে বরের চিত্রকর্ম',
    },
    showMap: true,
    showFamilyAddresses: false, // Clean look without dummy addresses
  },

  event: {
    date: '2027-01-15',
    time: '13:00',
    endTime: '17:00',
    timezone: 'Asia/Dhaka',
    isoDateTime: '2027-01-15T13:00:00+06:00',
    isoEndDateTime: '2027-01-15T17:00:00+06:00',
  },

  contact: {
    whatsappRsvp: {
      number: '8801765058263',
      display: '01765058263',
      international: '+8801765058263',
      url: 'https://wa.me/8801765058263',
    },
    informationPhone: {
      number: '8801765058263',
      display: '01765058263',
      displayBn: '০১৭৬৫০৫৮২৬৩',
      international: '+8801765058263',
      telUrl: 'tel:+8801765058263',
    },
    whatsappMessage: {
      en: "Assalamu Alaikum. I am confirming my attendance for Azraf & Huzaifa's wedding ceremony.",
      bn: 'আসসালামু আলাইকুম। আজরাফ ও হুজাইফার বিবাহ অনুষ্ঠানে উপস্থিত থাকার বিষয়ে জানাচ্ছি।',
    },
  },

  venue: {
    latitude: 23.8546,
    longitude: 90.3995,
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Xinxian+Restaurant,+House+No.+1,+Road+No.+8,+Sector+1,+Uttara,+Dhaka+1230&output=embed',
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Xinxian+Restaurant,+House+No.+1,+Road+No.+8,+Sector+1,+Uttara,+Dhaka+1230',
    name: {
      en: 'Xinxian Restaurant & Event Space (Uttara)',
      bn: 'জিনজিয়ান রেস্টুরেন্ট অ্যান্ড ইভেন্ট স্পেস (উত্তরা)',
    },
    address: {
      en: 'House No. 1, Road No. 8, Sector 1, Uttara Model Town, Dhaka 1230',
      bn: 'বাড়ি নং ১, রোড নং ৮, সেক্টর ১, উত্তরা মডেল টাউন, ঢাকা ১২৩০',
    },
    fullAddress: {
      en: 'Xinxian Restaurant & Event Space, House No. 1, Road No. 8, Sector 1, Uttara Model Town, Dhaka 1230',
      bn: 'জিনজিয়ান রেস্টুরেন্ট অ্যান্ড ইভেন্ট স্পেস, বাড়ি নং ১, রোড নং ৮, সেক্টর ১, উত্তরা মডেল টাউন, ঢাকা ১২৩০',
    },
  },

  groom: {
    name: {
      en: 'Abdullah Azraf',
      bn: 'আব্দুল্লাহ আজরাফ',
    },
    fullName: {
      en: 'Abdullah Azraf',
      bn: 'আব্দুল্লাহ আজরাফ',
    },
    father: {
      en: 'Md. Nizamul Haque',
      bn: 'মোঃ নিজামুল হক',
    },
    mother: {
      en: 'Habiba Haque',
      bn: 'হাবিবা হক',
    },
    address: {
      en: 'Uttara, Dhaka',
      bn: 'উত্তরা, ঢাকা',
    },
  },

  bride: {
    name: {
      en: 'Huzaifa Kabir',
      bn: 'হুজাইফা কবির',
    },
    fullName: {
      en: 'Huzaifa Kabir',
      bn: 'হুজাইফা কবির',
    },
    father: {
      en: 'M.M Humaun Kabir',
      bn: 'এম.এম হুমায়ুন কবীর',
    },
    mother: {
      en: 'Rubina Akter',
      bn: 'রুবিনা আক্তার',
    },
    address: {
      en: 'Uttara, Dhaka',
      bn: 'উত্তরা, ঢাকা',
    },
  },

  hosts: {
    title: {
      en: 'With love,',
      bn: 'দাওয়াতান্তে',
    },
    members: [
      {
        en: 'M.M Humaun Kabir',
        bn: 'এম.এম হুমায়ুন কবীর',
      },
      {
        en: 'Rubina Akter',
        bn: 'রুবিনা আক্তার',
      },
    ],
  },

  welcomingCommittee: {
    title: {
      en: 'Welcoming you',
      bn: 'অভ্যর্থনায়',
    },
    members: [
      { en: 'Humayra', bn: 'হুমায়রা' },
      { en: 'Raisa', bn: 'রাইসা' },
      { en: 'Jaima', bn: 'জাইমা' },
      { en: 'Promi', bn: 'প্রমি' },
      { en: 'Shanta', bn: 'শান্তা' },
      { en: 'Soad', bn: 'সোয়াদ' },
      { en: 'Tamim', bn: 'তামিম' },
      { en: 'Sanaya', bn: 'সানায়া' },
    ],
  },

  translations: {
    en: {
      bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      heroTagline: 'Join us to celebrate',
      heroTitle: 'Azraf & Huzaifa',
      subtitle: 'Wedding Ceremony',
      dateLine: 'Friday, 15 January 2027',
      countdownLabels: {
        days: 'Days',
        hours: 'Hours',
        min: 'Min',
        sec: 'Sec',
      },
      countdownFinished: "Today is the day. We can't wait to see you!",
      countdownStates: {
        eventDay: 'Today is the Celebration!',
        postEvent: 'A Beautiful Celebration Begins a New Chapter',
      },
      envelope: {
        bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        tagline: 'A Special Invitation',
        coupleNames: 'Azraf & Huzaifa',
        openButton: 'Open Invitation',
        skipButton: 'Skip to Invitation',
        replayButton: 'View Envelope',
      },
      invitationHeading: "You're invited",
      invitationBody:
        'Assalamu Alaikum. With the blessings of Allah, we warmly invite you to celebrate the wedding ceremony of Abdullah Azraf and Huzaifa Kabir. Your presence and duas would make our celebration truly special.',
      familyBlock: {
        groomParentsTitle: "Groom's Parents",
        brideParentsTitle: "Bride's Parents",
        fatherLabel: 'Father: ',
        motherLabel: 'Mother: ',
        addressLabel: 'Family Address:',
      },
      details: {
        date: 'Friday, 15 January 2027',
        time: '1:00 PM',
        venue: 'Xinxian Restaurant & Event Space (Uttara)',
        calendarBtn: 'Add to Calendar',
        directionsBtn: 'Directions',
      },
      timeline: {
        title: 'Event Timeline',
        dateStep: 'Date',
        timeStep: 'Time',
        venueStep: 'Venue',
        lunchReception: 'Wedding Feast (Lunch)',
      },
      venueHeading: 'Find us',
      rsvpHeading: 'Will you join us?',
      rsvpHelper: 'A quick message helps us plan. Thank you!',
      rsvpContactLabel: 'For event information: ',
      buttons: {
        whatsapp: 'RSVP on WhatsApp',
        call: 'Call for Information',
        calendar: 'Add to Calendar',
        directions: 'Directions',
        floatingRsvp: 'RSVP',
      },
      accordion: {
        title: 'Hosts & Welcoming Committee',
        withLove: 'With love,',
        welcoming: 'Welcoming you',
      },
      footer: {
        presence: 'Your presence and duas complete our joy.',
        duaArabic: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
        duaTranslation: 'Barakallahu lakuma wa baraka alaykuma wa jama\'a baynakuma fi khayr.',
        credits: 'Azraf & Huzaifa • 15 January 2027',
      },
      nav: {
        home: 'Home',
        invitation: 'Invitation',
        venue: 'Venue',
        rsvp: 'RSVP',
        languageSwitch: 'বাংলা',
      },
    },

    bn: {
      bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      heroTagline: 'আনন্দের এই দিনে আপনাকে আমন্ত্রণ',
      heroTitle: 'আজরাফ & হুজাইফা',
      subtitle: 'বিবাহ অনুষ্ঠান',
      dateLine: '১৫ জানুয়ারি ২০২৭, শুক্রবার',
      countdownLabels: {
        days: 'দিন',
        hours: 'ঘণ্টা',
        min: 'মিনিট',
        sec: 'সেকেন্ড',
      },
      countdownFinished: 'আজই সেই দিন। আপনার অপেক্ষায় আছি!',
      countdownStates: {
        eventDay: 'আজ আমাদের আনন্দের দিন!',
        postEvent: 'একটি সুন্দর আয়োজনের স্মৃতিতে শুরু হোক নতুন অধ্যায়।',
      },
      envelope: {
        bismillah: 'বِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        tagline: 'একটি বিশেষ আমন্ত্রণ',
        coupleNames: 'আজরাফ ও হুজাইফা',
        openButton: 'আমন্ত্রণটি খুলুন',
        skipButton: 'সরাসরি দেখুন',
        replayButton: 'খাম দেখুন',
      },
      invitationHeading: 'দাওয়াত',
      invitationBody:
        'আসসালামু আলাইকুম। মহান আল্লাহর অশেষ রহমতে আমাদের প্রিয় সন্তান আব্দুল্লাহ আজরাফ ও হুজাইফা কবির-এর বিবাহ অনুষ্ঠানে আপনাকে আন্তরিক আমন্ত্রণ জানাচ্ছি। আপনার উপস্থিতি ও দোয়া আমাদের আনন্দকে পূর্ণতা দেবে।',
      familyBlock: {
        groomParentsTitle: 'বরের পিতা-মাতা',
        brideParentsTitle: 'কনের পিতা-মাতা',
        fatherLabel: 'পিতা: ',
        motherLabel: 'মাতা: ',
        addressLabel: 'ঠিকানা:',
      },
      details: {
        date: '১৫ জানুয়ারি ২০২৭, রোজ শুক্রবার',
        time: 'দুপুর ১.০০ ঘটিকা',
        venue: 'জিনজিয়ান রেস্টুরেন্ট অ্যান্ড ইভেন্ট স্পেস (উত্তরা)',
        calendarBtn: 'ক্যালেন্ডারে যুক্ত করুন',
        directionsBtn: 'রুট দেখুন',
      },
      timeline: {
        title: 'অনুষ্ঠান সূচি',
        dateStep: 'তারিখ',
        timeStep: 'সময়',
        venueStep: 'স্থান',
        lunchReception: 'প্রীতিভোজ',
      },
      venueHeading: 'অনুষ্ঠানের স্থান',
      rsvpHeading: 'আপনি কি আসছেন?',
      rsvpHelper: 'একটি ছোট্ট বার্তা আমাদের আয়োজনে সাহায্য করবে। ধন্যবাদ!',
      rsvpContactLabel: 'অনুষ্ঠান সংক্রান্ত তথ্য: ',
      buttons: {
        whatsapp: 'WhatsApp-এ জানান',
        call: 'তথ্যের জন্য কল করুন',
        calendar: 'ক্যালেন্ডারে যুক্ত করুন',
        directions: 'রুট দেখুন',
        floatingRsvp: 'উপস্থিতি জানান',
      },
      accordion: {
        title: 'দাওয়াতান্তে ও অভ্যর্থনায়',
        withLove: 'দাওয়াতান্তে',
        welcoming: 'অভ্যর্থনায়',
      },
      footer: {
        presence: 'আপনার উপস্থিতি ও দোয়া আমাদের আনন্দকে পূর্ণ করবে।',
        duaArabic: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
        duaTranslation: 'আল্লাহ আপনাদের উভয়কে বরকত দান করুন, আপনাদের উপর বরকত নাযিল করুন এবং কল্যাণের সাথে একত্রিত রাখুন।',
        credits: 'আজরাফ ও হুজাইফা • ১৫ জানুয়ারি ২০২৭',
      },
      nav: {
        home: 'হোম',
        invitation: 'দাওয়াত',
        venue: 'স্থান',
        rsvp: 'যোগাযোগ',
        languageSwitch: 'English',
      },
    },
  },
}
