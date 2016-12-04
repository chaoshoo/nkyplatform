package com.sys.common.wrapper;

import java.util.Collection;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * encapsulationRoot Element yes CollectionSituation.
 * 
 * @author vincent
 */
@XmlRootElement(name = "collection")
public class CollectionWrapper {
	@XmlAnyElement
	public Collection<?> collection;

	public CollectionWrapper() {
	}

	public CollectionWrapper(Collection<?> collection) {
		this.collection = collection;
	}
}