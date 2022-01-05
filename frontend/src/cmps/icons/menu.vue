<template>
<svg :stroke="color || 'white'" :fill="color || 'white'" stroke-width="0" viewBox="0 0 16 16" :height="size || '16px'" :width="size || '16px'" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd"
        d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path>
</svg>
</template>

<script>
export default {
    name: 'svg-menu',
    props:['color', 'size']
}
</script>