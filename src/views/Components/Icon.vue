<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Infotip } from '@/components/Infotip'
import { ElButton } from 'element-plus'
import { useIcon } from '@/hooks/web/useIcon'

const { t } = useI18n()

const keyClick = (key: string) => {
   if (key === t('iconDemo.accessAddress')) {
      window.open('https://iconify.design/')
   }
}

const peoples = useIcon({ icon: 'svg-icon:peoples' })
const money = useIcon({ icon: 'svg-icon:money' })
const aim = useIcon({ icon: 'ep:aim' })
const alarmClock = useIcon({ icon: 'ep:alarm-clock' })
</script>

<template>
   <Infotip
      :show-index="false"
      :title="`${t('iconDemo.recommendedUse')}${t('iconDemo.iconify')}`"
      :schema="[
         {
            label: t('iconDemo.recommendeDes'),
            keys: ['Iconify']
         },
         {
            label: t('iconDemo.accessAddress'),
            keys: [t('iconDemo.accessAddress')]
         }
      ]"
      @click="keyClick"
   />
   <ContentWrap :title="t('iconDemo.localIcon')">
      <div class="flex justify-between">
         <Icon icon="svg-icon:peoples" />
         <Icon icon="svg-icon:money" />
         <Icon icon="svg-icon:message" />
         <Icon icon="svg-icon:shopping" />
      </div>
   </ContentWrap>
   <ContentWrap :title="t('iconDemo.iconify')">
      <div class="flex justify-between">
         <Icon icon="ep:aim" />
         <Icon icon="ep:alarm-clock" />
         <Icon icon="ep:baseball" />
         <Icon icon="ep:chat-line-round" />
      </div>
   </ContentWrap>
   <ContentWrap title="useIcon">
      <div class="flex justify-between">
         <ElButton :icon="peoples">Button</ElButton>
         <ElButton :icon="money">Button</ElButton>
         <ElButton :icon="aim">Button</ElButton>
         <ElButton :icon="alarmClock">Button</ElButton>
      </div>
   </ContentWrap>
</template>
