FROM denoland/deno:alpine
EXPOSE 8000
WORKDIR /app
RUN deno install --global --allow-net --allow-read jsr:@std/http/file-server
COPY . .
CMD ["file-server", "."]
