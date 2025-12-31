import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: "Código não fornecido" },
        { status: 400 }
      )
    }

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const clientSecret = process.env.DISCORD_CLIENT_SECRET

    console.log("🔑 Client ID:", clientId ? "Configurado ✅" : "FALTANDO ❌")
    console.log("🔐 Client Secret:", clientSecret ? "Configurado ✅" : "FALTANDO ❌")

    if (!clientId || !clientSecret) {
      console.error("❌ Variáveis de ambiente não configuradas")
      return NextResponse.json(
        { error: "Configuração do servidor incompleta - verifique o .env.local" },
        { status: 500 }
      )
    }

    // Trocar o código por um access token
    console.log("🔄 Tentando trocar código por token...")
    
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/auth/callback",
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("❌ Erro ao obter token:", errorData)
      return NextResponse.json(
        { 
          error: "Falha ao obter token do Discord", 
          details: errorData,
          hint: "O código pode ter expirado. Tente fazer login novamente."
        },
        { status: 500 }
      )
    }

    console.log("✅ Token obtido com sucesso!")

    const tokenData = await tokenResponse.json()
    const { access_token, token_type } = tokenData

    // Buscar informações do usuário
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    })

    if (!userResponse.ok) {
      const errorData = await userResponse.json()
      console.error("Erro ao obter dados do usuário:", errorData)
      return NextResponse.json(
        { error: "Falha ao obter dados do usuário" },
        { status: 500 }
      )
    }

    const userData = await userResponse.json()

    // Buscar guilds (servidores) do usuário (opcional)
    const guildsResponse = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    })

    let userGuilds = []
    if (guildsResponse.ok) {
      userGuilds = await guildsResponse.json()
    }

    // Montar avatar URL
    const avatarUrl = userData.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.discriminator) % 5}.png`

    // Aqui você pode:
    // 1. Salvar o usuário no banco de dados
    // 2. Criar uma sessão
    // 3. Gerar um JWT token
    // 4. Verificar se o usuário está em servidores específicos
    // etc.

    const userInfo = {
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: avatarUrl,
      email: userData.email,
      verified: userData.verified,
      globalName: userData.global_name,
      guilds: userGuilds.length,
    }

    console.log("✅ Usuário logado com sucesso:", userInfo)

    return NextResponse.json({
      success: true,
      user: userInfo,
      message: "Login realizado com sucesso!",
    })

  } catch (error) {
    console.error("❌ Erro no processo de autenticação:", error)
    return NextResponse.json(
      { 
        error: "Erro interno do servidor", 
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      },
      { status: 500 }
    )
  }
}