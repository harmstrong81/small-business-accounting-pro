# Small Business Accounting Pro - Website

A professional landing page for small business accounting and M&A services.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern UI
- **Contact Form**: Integrated with Formspree for email notifications
- **Service Tiers**: Monthly, quarterly, yearly, and ad-hoc service options
- **Dark Theme**: Professional dark color scheme
- **Form Validation**: Client-side validation with real-time feedback
- **Smooth Animations**: CSS transitions and JavaScript animations

## 📧 Form Setup

The contact form is integrated with **Formspree** for email notifications.

### Current Configuration
- **Form ID**: `xayzqkqw`
- **Action URL**: `https://formspree.io/f/xayzqkqw`
- **Method**: POST

### To Set Up Your Own Formspree:

1. **Create Account**: Go to [formspree.io](https://formspree.io) and sign up
2. **Create Form**: Click "New Form" and give it a name
3. **Get Form ID**: Copy the form endpoint URL
4. **Update HTML**: Replace the action URL in `index.html`:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Form Fields
- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Service** (required dropdown)
- **Message** (required)
- **Newsletter** (optional checkbox)

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:
- Primary: `#10b981` (Green)
- Secondary: `#3b82f6` (Blue)
- Background: `#0f172a` (Dark Blue)
- Text: `#f1f5f9` (Light Gray)

### Fonts
Currently using Google Fonts (Inter) loaded via CDN.

## 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Form Features

### Validation
- Real-time field validation
- Email format validation
- Phone number validation
- Required field checking

### User Experience
- Loading states during submission
- Success/error messages
- Form reset after successful submission
- Smooth animations

### Spam Protection
- Formspree includes built-in spam filtering
- Honeypot fields (if needed)
- Rate limiting

## 📊 Analytics (Optional)

To add Google Analytics:
1. Get your tracking ID from Google Analytics
2. Add the tracking code to the `<head>` section of `index.html`

## 🚀 Deployment

### Local Development
```bash
# Open index.html in your browser
open index.html
```

### Web Hosting
Upload all files to your web hosting provider:
- `index.html`
- `styles.css`
- `script.js`
- Any images or assets

## 📞 Contact Information

- **Phone**: (310) 819-6534
- **Email**: info@smallbusinessaccountingpro.com
- **Address**: 123 Financial District, New York, NY 10001

## 🔄 Updates

### Recent Changes
- ✅ Added Formspree integration
- ✅ Enhanced form validation
- ✅ Added service selection dropdown
- ✅ Improved mobile responsiveness
- ✅ Added success/error messages

### Future Enhancements
- [ ] Google Analytics integration
- [ ] Blog section
- [ ] Client testimonials carousel
- [ ] Service pricing calculator
- [ ] Appointment booking system

## 📝 License

This project is for Small Business Accounting Pro. All rights reserved. 