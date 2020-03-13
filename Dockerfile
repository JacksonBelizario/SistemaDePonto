FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

# install nodejs
RUN apt-get update && apt-get install -y wget
RUN wget -qO- https://deb.nodesource.com/setup_12.x | bash - &&  apt-get install -y build-essential nodejs


WORKDIR /app

COPY *.csproj ./
RUN dotnet restore SistemaDePonto.csproj

COPY . ./
RUN dotnet publish SistemaDePonto.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

# Expose port 80 to your local machine so you can access the app.
EXPOSE 80

COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "SistemaDePonto.dll"]