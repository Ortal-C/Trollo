<template>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :height="size || '24px'" :width="size || '24px'" viewBox="0 0 172 172" style="fill: black;">
    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
    	<path d="M0,172v-172h172v172z" fill="none"></path>
    	<g :fill="color|| '#666666'">
            <path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"></path>
        </g>
    </g>
</svg>
</template>

<script>
export default {
    name: 'svg-close',
    props:['color', 'size']
}
</script>