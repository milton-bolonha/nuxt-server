# 🎮 Plano: Transformação para Estilo Brawl Stars

Baseado no `ideia.txt` - App React inspirado no Brawl Stars com design de jogo mobile.

## 🎯 **Visão Geral**

Transformar o app Nuxt em uma experiência gamificada estilo Brawl Stars, com:

-   Lobby interativo com cards flutuantes
-   Navegação dock bottom-style
-   Modais fullscreen animados
-   Tema escuro com gradientes vibrantes
-   Componentes arcade (botões 3D, cards flutuantes)
-   Sistema de XP e achievements

## 🏗️ **Arquitetura Atual vs Nova**

### **Atual (Nuxt Legal)**

```
📁 Nuxt App
├── 📄 default.vue     # Navbar + sidebar
├── 📄 constitution.vue # Páginas simples
├── 📄 modal.vue       # Modal básico
└── 📄 button-link.vue # Botões simples
```

### **Nova (Brawl Stars Style)**

```
📁 Nuxt Brawl App
├── 📄 brawl-lobby.vue    # Lobby principal animado
├── 📄 arcade-button.vue  # Botões 3D estilo jogo
├── 📄 floating-card.vue  # Cards flutuantes
├── 📄 fullscreen-modal.vue # Modais tela-cheia
├── 📄 bottom-dock.vue    # Navegação bottom dock
└── 📄 particle-bg.vue    # Background com partículas
```

## 🎨 **Componentes Principais**

### **1. ArcadeButton** (Botão 3D estilo jogo)

```vue
<template>
    <button :class="arcadeClasses" @click="$emit('click')">
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    color: { type: String, default: "blue" },
    size: { type: String, default: "md" },
});

const arcadeClasses = computed(() => [
    // Estilos 3D com border-bottom para efeito pressed
    "border-b-4 active:border-b-0 active:translate-y-1",
    "transition-all font-black uppercase tracking-wide",
    "flex items-center justify-center gap-2",
    // Cores vibrantes como Brawl Stars
    props.color === "yellow" ? "bg-[#ffce00] border-[#cc9900] text-black" : "",
    props.color === "blue" ? "bg-[#0096e6] border-[#006ab3] text-white" : "",
    // Tamanhos
    props.size === "lg" ? "px-6 py-4 text-lg" : "px-4 py-2 text-sm",
]);
</script>
```

### **2. FloatingCard** (Cards flutuantes)

```vue
<template>
    <div class="floating-card" @click="$emit('click')">
        <div class="card-content">
            <div class="card-icon">
                <slot name="icon" />
            </div>
            <div class="card-title">
                <slot name="title" />
            </div>
            <div class="card-subtitle">
                <slot name="subtitle" />
            </div>
        </div>
        <div class="card-glow"></div>
    </div>
</template>

<style scoped>
.floating-card {
    @apply relative bg-white/90 backdrop-blur-sm rounded-2xl p-6;
    @apply border-4 border-black shadow-2xl cursor-pointer;
    @apply transition-all duration-300 hover:scale-105;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.card-glow {
    @apply absolute inset-0 rounded-2xl opacity-0;
    @apply bg-gradient-to-r from-cyan-400 to-blue-600;
    @apply transition-opacity duration-300;
}

.floating-card:hover .card-glow {
    @apply opacity-20;
}
</style>
```

### **3. BottomDock** (Navegação estilo mobile games)

```vue
<template>
    <div class="bottom-dock">
        <div class="dock-container">
            <!-- Itens do dock -->
            <div
                v-for="item in dockItems"
                :key="item.id"
                :class="['dock-item', { active: activeItem === item.id }]"
                @click="$emit('navigate', item.id)"
            >
                <component :is="item.icon" :size="24" />
                <span class="dock-label">{{ item.label }}</span>
            </div>

            <!-- Botão central flutuante (estilo Brawl Stars) -->
            <div class="central-button" @click="$emit('action')">
                <div class="button-content">
                    <PlayCircle size="32" />
                    <span>JOGAR</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bottom-dock {
    @apply fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50;
    @apply w-[95%] max-w-lg;
}

.dock-container {
    @apply bg-black/80 backdrop-blur-md border-4 border-black rounded-2xl;
    @apply p-2 flex justify-between items-end gap-2;
}

.dock-item {
    @apply flex flex-col items-center justify-center;
    @apply w-12 h-12 sm:w-14 sm:h-14 rounded-xl;
    @apply bg-gray-700 border-b-4 border-gray-600;
    @apply text-white transition-all cursor-pointer;
    @apply active:border-b-0 active:translate-y-1;
}

.dock-item.active {
    @apply bg-yellow-400 border-yellow-600 text-black;
    @apply -translate-y-2 shadow-lg;
}

.central-button {
    @apply relative -top-6 z-50;
}

.button-content {
    @apply bg-yellow-400 border-4 border-yellow-600 text-black;
    @apply border-b-[8px] px-8 py-4 rounded-2xl;
    @apply font-black text-xl uppercase tracking-widest;
    @apply shadow-xl active:border-b-0 active:translate-y-2;
    @apply flex flex-col items-center justify-center;
    @apply transition-all cursor-pointer;
}
</style>
```

## 🏠 **Lobby Principal (Brawl Style)**

### **Background Animado**

```vue
<template>
    <div class="lobby-bg">
        <!-- Partículas flutuantes -->
        <div class="particles">
            <div
                v-for="i in 50"
                :key="i"
                class="particle"
                :style="{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 10 + 's',
                }"
            ></div>
        </div>

        <!-- Gradiente dinâmico -->
        <div class="gradient-bg"></div>
    </div>
</template>

<style scoped>
.lobby-bg {
    @apply fixed inset-0;
    background: radial-gradient(
        ellipse at center,
        theme(colors.indigo.900) 0%,
        theme(colors.purple.900) 50%,
        theme(colors.black) 100%
    );
}

.particles .particle {
    @apply absolute w-1 h-1 bg-white rounded-full opacity-30;
    animation: float-particle 10s ease-in-out infinite;
}

@keyframes float-particle {
    0%,
    100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.3;
    }
    50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.8;
    }
}
</style>
```

### **Hero Card Flutuante**

```vue
<template>
    <div class="hero-card">
        <div class="card-container">
            <img :src="userAvatar" class="hero-avatar" />
            <div class="hero-info">
                <h1 class="hero-name">{{ userName }}</h1>
                <div class="hero-level">LVL {{ userLevel }}</div>
                <div class="hero-xp">
                    <div class="xp-bar">
                        <div
                            class="xp-fill"
                            :style="{ width: xpPercentage + '%' }"
                        ></div>
                    </div>
                    <span class="xp-text"
                        >{{ currentXp }}/{{ nextLevelXp }}</span
                    >
                </div>
            </div>
        </div>
        <div class="card-shadow"></div>
    </div>
</template>

<script setup>
const userName = "Guilherme";
const userLevel = 3;
const currentXp = 1250;
const nextLevelXp = 1500;
const xpPercentage = (currentXp / nextLevelXp) * 100;
</script>

<style scoped>
.hero-card {
    @apply relative cursor-pointer;
    animation: hero-float 4s ease-in-out infinite;
}

@keyframes hero-float {
    0%,
    100% {
        transform: translateY(0px) rotate(-2deg);
    }
    50% {
        transform: translateY(-15px) rotate(2deg);
    }
}

.hero-avatar {
    @apply w-32 h-32 rounded-3xl border-4 border-black shadow-2xl;
}

.xp-bar {
    @apply w-full bg-black/40 rounded-full h-3 overflow-hidden;
    @apply border-2 border-black/20;
}

.xp-fill {
    @apply bg-gradient-to-r from-yellow-400 to-orange-500 h-full;
    @apply transition-all duration-1000 ease-out;
}
</style>
```

## 🗂️ **Estrutura de Arquivos**

```
📁 app/
├── 📁 layouts/
│   └── 📄 brawl-lobby.vue     # Layout principal
├── 📁 components/
│   ├── 📄 arcade-button.vue   # Botão 3D
│   ├── 📄 floating-card.vue   # Card flutuante
│   ├── 📄 bottom-dock.vue     # Navegação dock
│   ├── 📄 particle-bg.vue     # Background animado
│   └── 📄 fullscreen-modal.vue # Modal tela-cheia
├── 📁 pages/
│   ├── 📄 index.vue          # Lobby principal
│   └── 📄 game.vue           # Página do jogo
└── 📁 composables/
    └── 📄 useBrawlState.ts   # Estado do jogo
```

## 🎮 **Funcionalidades Brawl Stars**

### **1. Sistema de XP e Níveis**

```typescript
// composables/useBrawlState.ts
const useBrawlState = () => {
    const level = ref(3);
    const xp = ref(1250);
    const nextLevelXp = ref(1500);

    const addXp = (amount: number) => {
        xp.value += amount;
        if (xp.value >= nextLevelXp.value) {
            levelUp();
        }
    };

    const levelUp = () => {
        level.value++;
        xp.value = 0;
        nextLevelXp.value = level.value * 500;
        // Animação de level up!
    };

    return { level, xp, nextLevelXp, addXp };
};
```

### **2. Cards Interativos**

```vue
<template>
    <FloatingCard @click="navigateTo(item.route)">
        <template #icon>
            <component :is="item.icon" size="32" />
        </template>
        <template #title>{{ item.title }}</template>
        <template #subtitle>{{ item.description }}</template>
    </FloatingCard>
</template>
```

### **3. Modais Tela-Cheia**

```vue
<template>
    <FullscreenModal :show="showModal" @close="closeModal">
        <div class="modal-content">
            <!-- Conteúdo do modal -->
        </div>
    </FullscreenModal>
</template>
```

## 🎨 **Paleta de Cores (Brawl Stars)**

```css
:root {
    --brawl-yellow: #ffce00;
    --brawl-yellow-dark: #cc9900;
    --brawl-blue: #0096e6;
    --brawl-blue-dark: #006ab3;
    --brawl-purple: #9d4edd;
    --brawl-purple-dark: #5a189a;
    --brawl-black: #1e1e2e;
    --brawl-dark: #131226;
}
```

## 🚀 **Plano de Implementação**

### **Fase 1: Componentes Base**

-   [ ] Criar `ArcadeButton.vue`
-   [ ] Criar `FloatingCard.vue`
-   [ ] Criar `BottomDock.vue`
-   [ ] Criar `ParticleBg.vue`

### **Fase 2: Layout do Lobby**

-   [ ] Criar `layouts/brawl-lobby.vue`
-   [ ] Implementar background animado
-   [ ] Adicionar hero card flutuante

### **Fase 3: Sistema de Navegação**

-   [ ] Implementar rotas `/brawl/*`
-   [ ] Sistema de modais
-   [ ] Transições suaves

### **Fase 4: Funcionalidades**

-   [ ] Sistema de XP/níveis
-   [ ] Achievements/badges
-   [ ] Animações de entrada

## 🎯 **Resultado Final**

Um app Nuxt com visual idêntico ao Brawl Stars:

-   Lobby interativo com cards flutuantes
-   Navegação intuitiva estilo mobile games
-   Animações suaves e efeitos visuais
-   Experiência gamificada completa

**Será incrível! 🎮✨**

---

## 📝 **Nota Importante: Dados Estáticos**

Para evitar problemas de resolução de módulos, use **arquivos JSON** em vez de TypeScript:

```bash
# Criar pasta de dados
mkdir server/data

# Converter seeds para JSON
cp prisma/seeds/*.ts server/data/
cd server/data && for f in *.ts; do mv "$f" "${f%.ts}.json"; done
```

### Exemplo de API:

```typescript
// ✅ Funciona perfeitamente
import constitutionData from "../data/constitution.json";

export default defineEventHandler(async (event) => {
    return constitutionData.articles.map((article) => ({
        title: article.title,
        description: article.summary,
        hasArticle: true,
        key: `article${article.number}`,
    }));
});
```

**JSON evita problemas de bundling e funciona sempre! 📄**
