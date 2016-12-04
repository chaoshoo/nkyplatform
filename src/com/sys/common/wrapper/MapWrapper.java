package com.sys.common.wrapper;

import java.util.Map;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.sys.common.adapter.MapAdapter;

/**
 * encapsulationRoot Element yes MapSituation.
 * 
 * @author vincent
 */
@XmlRootElement(name = "map")
public class MapWrapper {
	
	@XmlAnyElement
	@XmlJavaTypeAdapter(MapAdapter.class)
	protected Map<?, ?> map;

	public MapWrapper() {
	}

	public MapWrapper(Map<?, ?> map) {
		this.map = map;
	}
}