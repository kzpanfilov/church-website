FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy csproj files and restore
COPY src/Church.Core/Church.Core.csproj src/Church.Core/
COPY src/Church.Infrastructure/Church.Infrastructure.csproj src/Church.Infrastructure/
COPY src/Church.Api/Church.Api.csproj src/Church.Api/
RUN dotnet restore src/Church.Api/Church.Api.csproj

# Copy source and build backend
COPY src/ src/
RUN dotnet publish src/Church.Api/Church.Api.csproj -c Release -o /app/publish

# Build frontend
FROM node:20 AS frontend-build
WORKDIR /client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .
COPY --from=frontend-build /client/dist ./wwwroot

EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Church.Api.dll"]
