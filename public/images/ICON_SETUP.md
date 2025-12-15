# 🤖 Chatbot Icon Setup

## Required File

Place your chatbot icon here as:
```
chatbot-icon.png
```

## Icon Specifications

- **Format**: PNG with transparency
- **Size**: 512×512 pixels  
- **Colors**: White or light colors (displays on purple #7D6378 background)
- **File Size**: < 50KB recommended
- **Background**: Transparent

## Quick Guide

1. Design or download a simple robot/assistant icon
2. Save as `chatbot-icon.png`
3. Place in this directory: `public/images/chatbot-icon.png`
4. The widget will automatically use your icon

## Icon Design Tips

### ✅ DO
- Simple, clear design
- Recognizable at 40px
- High contrast on purple
- Friendly appearance
- Transparent background

### ❌ DON'T
- Complex details
- Dark colors
- Small text
- Gradients that don't scale
- Large file sizes

## Recommended Icon Sources

- **Heroicons**: https://heroicons.com
- **Lucide**: https://lucide.dev  
- **Flaticon**: https://www.flaticon.com
- **Icons8**: https://icons8.com

## Testing Your Icon

Visit `/chat` page to see the three-state widget:
1. **State 1**: Circular icon (your icon here)
2. **State 2**: Minimized bar
3. **State 3**: Expanded widget

## Need Help?

If your icon isn't showing:
- Check filename: must be `chatbot-icon.png`
- Check location: must be in `public/images/`
- Check format: must be PNG with transparency
- Rebuild Next.js: `npm run build`

---

**Current Status**: ⚠️ Add your `chatbot-icon.png` here to complete the setup!
