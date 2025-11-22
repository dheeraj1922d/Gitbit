# Deployment Guide

This guide covers various deployment options for GitBit.

## Deployment Options

### 1. Vercel (Recommended)

Vercel offers the easiest deployment for React applications.

**Steps:**

1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import the `Gitbit` repository
6. Vercel will auto-detect Vite and configure settings
7. Click "Deploy"

**Custom Domain (Optional):**
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

### 2. Netlify

**Steps:**

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Choose GitHub and select `Gitbit` repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Custom Domain (Optional):**
- Go to Domain settings
- Add custom domain
- Configure DNS

### 3. GitHub Pages

**Steps:**

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://dheeraj1922d.github.io/Gitbit",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/Gitbit/'
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Save

### 4. Docker Deployment

**Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Create `docker-compose.yml`:**
```yaml
version: '3.8'
services:
  gitbit:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

**Deploy:**
```bash
docker-compose up -d
```

### 5. AWS S3 + CloudFront

**Steps:**

1. Build the project:
   ```bash
   npm run build
   ```

2. Create S3 bucket:
   ```bash
   aws s3 mb s3://gitbit-app
   ```

3. Enable static website hosting:
   ```bash
   aws s3 website s3://gitbit-app --index-document index.html
   ```

4. Upload files:
   ```bash
   aws s3 sync dist/ s3://gitbit-app
   ```

5. Create CloudFront distribution for HTTPS and caching

### 6. Self-Hosted (Linux Server)

**Prerequisites:**
- Linux server (Ubuntu/Debian)
- Nginx installed
- Domain name (optional)

**Steps:**

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy dist folder to server:
   ```bash
   scp -r dist/* user@server:/var/www/gitbit
   ```

3. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/gitbit;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## Environment Variables

If you need to configure environment variables:

1. Create `.env` file:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   VITE_DEFAULT_REPO_OWNER=username
   VITE_DEFAULT_REPO_NAME=repository
   ```

2. Access in code:
   ```javascript
   const token = import.meta.env.VITE_GITHUB_TOKEN;
   ```

3. For production, set environment variables in your hosting platform

## Post-Deployment Checklist

- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Verify GitHub API integration works
- [ ] Test dark/light theme toggle
- [ ] Check responsive navigation
- [ ] Verify all routes work correctly
- [ ] Test with different GitHub repositories
- [ ] Check console for errors
- [ ] Verify caching works correctly
- [ ] Test bookmark and progress tracking features
- [ ] Confirm code copy/download functionality

## Performance Optimization

### Enable Compression

Most hosting platforms enable compression by default. For self-hosted:

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### CDN Integration

Use a CDN for better performance:
- Cloudflare (Free tier available)
- AWS CloudFront
- Fastly

### Caching Headers

Configure appropriate cache headers:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Monitoring

### Error Tracking

Integrate error tracking services:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Rollbar](https://rollbar.com)

### Analytics

Add analytics to track usage:
- Google Analytics
- Plausible Analytics
- Umami

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Don't Work

Configure rewrites for SPA:
- **Vercel**: Automatic
- **Netlify**: Create `_redirects` file:
  ```
  /*    /index.html   200
  ```

### GitHub API Rate Limit

Add GitHub token in environment variables or service configuration.

## Security

### Best Practices

1. Never commit GitHub tokens to repository
2. Use environment variables for sensitive data
3. Enable HTTPS (automatic on most platforms)
4. Set Content Security Policy headers
5. Configure CORS if needed

## Support

For deployment issues:
1. Check hosting platform documentation
2. Review build logs
3. Open an issue on GitHub
4. Check console for errors

Happy deploying! 🚀
