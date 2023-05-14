import React, { useEffect, useRef } from 'react'

import FormPresenter from '../form/form-presenter'
import Model from '../../model'
import InformationPresenter from '../information/information-presenter'
import { observer } from 'mobx-react'

interface MainPagePresenterProps {
  model: Model
}

const MainPagePresenter = observer(({ model }: MainPagePresenterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!model.searchInProgress && model.destinationAddress && model.trips) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [model.searchInProgress, model.destinationAddress, model.trips])

  return (
    <>
      <FormPresenter
        homeAddress={model.homeAddress}
        saveHomeAddress={model.saveHomeAddress}
        searchInProgress={model.searchInProgress}
        doSearch={model.doSearch}
        itemGroups={model.itemGroups ?? []}
        setPreActivity={model.setPreActivity}
      />
      <div ref={scrollRef}>
        <InformationPresenter
          originAddress={model.homeAddress}
          destinationAddress={model.destinationAddress}
          destinationTime={model.arriveTime}
          searchInProgress={model.searchInProgress}
          trips={model.trips}
          itemGroup={model.preActivity}
        />
      </div>
    </>
  )
})

export default MainPagePresenter
